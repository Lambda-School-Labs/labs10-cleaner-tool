import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import setGeneralMiddleware from './middleware/generalMiddleware';
// @ts-ignore
import companion from '@uppy/companion';
import verifyToken from './middleware/verifyToken';
import * as users from './controller/users';
import * as guests from './controller/guests';
import * as houses from './controller/houses';
import * as lists from './controller/lists';
import * as items from './controller/items';
import * as email from './controller/email';
import * as payments from './controller/payments';
import * as stays from './controller/stays';
import * as connect from './controller/connect';
import * as assistants from './controller/assistants';
import path from 'path';

import { getSurveys, getSurvey, getSurveyResponse, getAllQuestionsAnswers, getQuestionsAnswers } from './models/surveys'

import db from '../data/dbConfig';

export const server = express();
setGeneralMiddleware(server);


server.use(express.static(path.resolve(path.join(__dirname, '../public'))));
server.get('/', (__, res) => res.sendFile('index.html'));

  server.get('/surveys', async(req,res)=>{
    try{
    const data = await getSurveys()
    res.json(data);
    }catch(e){res.json(e)}
  })

  server.get('/data', async(req,res)=>{
    try{
    const users = await db('user')
    console.log(users)
    res.json(users);
    }catch(e){res.json(e)}
  })

  server.get('/surveyresponses', async(req, res) => {
    try{
      console.log(req.body)
      const surveys = await getSurveys()
      if(surveys){
        const responses = await getAllQuestionsAnswers()
        res.status(200).json({ surveys, responses })
      }
    }catch(err){
      res.status(500).json(err)
    }
  });

  // server.get('/surveyresponses/:id', async(req,res)=>{
  //   try{
  //     const { id } = req.params
  //     console.log(id)
  //     const survey = await getSurvey(id)
  //     console.log(survey)
  //     if(survey) {
  //       const questionsAnswers = await getQuestionsAnswers(id)
  //       res.json({ survey, questionsAnswers });
  //     }
  //   }catch(e){res.json(e), console.log(e)}
  // })

  server.get('/surveyresponses/:id', async(req,res)=>{ 
    try{
      const { id } = req.params
      const survey = await getSurveyResponse(id)
        res.json({ survey });   
    }catch(e){
      res.json(e), console.log(e)
    }
  });

  server.get('/questions', async(req,res)=>{
    try{
    const data = await db('questions')
    res.json(data);
    }catch(e){res.json(e)}
  })
  
  server.get('/questionanswers/:id', async(req,res)=>{
    try{
      const { id } = req.params
      const questionAnswers = await getQuestionsAnswers(id)
      res.json({questionAnswers});
    }catch(e){res.json(e)}
  })
  
<<<<<<< HEAD
  server
=======
server
>>>>>>> 76a7a15687f4c175807d0564b08cd0581d3d6cb5
  .route('/users')
  .get(verifyToken, users.get)
  .post(users.post)
  .put(verifyToken, users.putByExtId);
<<<<<<< HEAD

// Authentication Middleware for *all* routes after this line
server.use(verifyToken);
// server
//   .route('/users')
//   .get(verifyToken, users.get)
//   .post(users.post)
//   .put(verifyToken, users.putByExtId);
=======
// Authentication Middleware for *all* routes after this line
server.use(verifyToken);

>>>>>>> 76a7a15687f4c175807d0564b08cd0581d3d6cb5
  
server
  .route('/users/:id')
  .get(users.get)
  .put(users.put)
  .delete(users.deleteU);

server.route('/guests').post(guests.post);

server.route('/guests/:id').put(guests.put);

server
  .route('/houses')
  .get(houses.get)
  .post(houses.post);

server
  .route('/houses/:id')
  .get(houses.get)
  .put(houses.put)
  .delete(houses.deleteU);

server
  .route('/payments')
  .get(payments.get)
  .post(payments.post);

server
  .route('/connect')
  .post(verifyToken, connect.post)
  .delete(verifyToken, connect.deleteL);

server.route('/connect/createpayment').post(connect.createPayment);

server.route('/lists').post(lists.post);
/* this get route looks for a query. if `lists/1?stay=true`
the id should be for a stay. Anything else the id should be for a house
*/
server
  .route('/lists/:id')
  .get(lists.get)
  .delete(lists.deleteL);

server
  .route('/items')
  .get(items.get)
  .post(items.post);
server
  .route('/items/:id')
  .get(items.get)
  .put(items.put)
  .delete(items.deleteL);

server.route('/assistants').get(assistants.get);

server
  .route('/assistants/:id')
  .get(assistants.getId)
  .post(assistants.postAst)
  .delete(assistants.delAst);

server.route('/itemComplete').post(items.itemComplete);

server.route('/email').post(verifyToken, email.send);

server
  .route('/stays')
  .get(stays.getAll)
  .post(stays.post);

server
  .route('/stays/:id')
  .get(stays.get)
  .put(stays.put);

const options = {
  filePath: '../uploads',
  providerOptions: {
    s3: {
      bucket: 'cleaner-pos',
      key: process.env.AWS_Key,
      region: process.env.REGION,
      secret: process.env.AWS_SECRET,
    },
  },
  server: {
    host: 'localhost:3020',
    protocol: 'http',
  },
};
server.use(companion.app(options));

server.use(errorHandler);

export default server;
