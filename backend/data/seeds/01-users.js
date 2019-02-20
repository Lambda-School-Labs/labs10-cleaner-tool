const data = require('./data/usersData');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').then(function() {
    // Inserts seed entries
    return knex('user').insert(data);
  });
};
