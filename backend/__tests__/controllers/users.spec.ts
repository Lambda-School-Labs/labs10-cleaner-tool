import 'jest';
import request from 'supertest';
import app from '../../src/app';

import knex from 'knex';
import knexConfig from '../../knexfile';

// Mock db in users model functions
jest.mock('../../data/dbConfig');
import db from '../../data/dbConfig';

// Use testDb instead of DB defined in env
// TODO: Find way to define type for mockImplementation
// spyon is a lead, but only works on a particular method?
const testDb = knex(knexConfig.test);
// @ts-ignore
db.mockImplementation((table: string) => testDb(table));

describe('/user routes', () => {
  beforeAll(async () => {
    /*
    Applies migrations to in-memory database,
    then applies seeds.
    */
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  });

  const cleanUp = async () => {
    try {
      await testDb.migrate.rollback();
      await testDb.migrate.latest();
      await testDb.seed.run();
    } catch (err) {
      throw err;
    }
  };

  test('Get request with invalid id returns a 404', (done) => {
    request(app)
      .get('/users/8')
      .set('Accept', 'application/json')
      .expect(404, done);
  });

  test('Get request with id returns a specific user', (done) => {
    request(app)
      .get('/users/1')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe('object');
        done();
      });
  });

  test('GET request with no id returns all users', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        done();
      });
  });

  test('POST request is successful', (done) => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    request(app)
      .post('/users')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201 || 200, done);
  });

  test('PUT request is successful', (done) => {
    const newUser = {
      address: 'bbah',
      email: 'rl@rl.com',
      ext_it: '123',
      full_name: 'RL',
      phone: '3235551111',
      role: 'manager',
    };
    request(app)
      .put('/users/1')
      .send(newUser)
      .set('Accept', 'application/json')
      .expect(201)
      .then((res) => {
        expect(res.body).toBe(1);
        done();
      });
  });

  test('DELETE request is successful', (done) => {
    request(app)
      .delete('/users/2')
      .set('Accept', 'application/json')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBe(1);
        done();
      });
  });
});