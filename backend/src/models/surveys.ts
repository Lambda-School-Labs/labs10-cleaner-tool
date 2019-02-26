import { QueryBuilder } from 'knex';
import db from '../../data/dbConfig';

interface Surveys {
  id: number;
  name: string;
  isGuest: boolean;
}

let getSurvey: (id: string) => QueryBuilder;
let getAllSurveys: () => QueryBuilder;
let getSurveyQuestions: (id: string) => QueryBuilder;
let getSurveyResponse: (id: number) => QueryBuilder;
let getQuestionsAnswers: (id: number) => QueryBuilder;
// Boy this one was a bit of a stretch
let filterByField: (
  field: string,
  fieldValue: string,
) => (query: QueryBuilder) => QueryBuilder;
let getSurveyByHouse: (id: string) => QueryBuilder;

/* Don't know why but I had to protect this in a function before it would work
  right otherwise it was returning a different sql statement every run */

const baseQuery = () => db('surveys');

filterByField = (field, fieldValue) => {
  return (query) => {
    return query.where(field, '=', fieldValue);
  };
};

getSurvey = (id) => {
  const filteredById = filterByField('id', id);
  return filteredById(baseQuery());
};

getAllSurveys = () => {
  return baseQuery();
};

getSurveyByHouse = (id) => {
  const filteredByHouseId = filterByField('house_id', id);
  return filteredByHouseId(baseQuery());
};

getSurveyQuestions = (id) => {
  return baseQuery()
    .join('questions', 'questions.survey_id', '=', 'survey.id')
    .select(
      'survey.name',
      'question.name',
      'survey.isGuest',
      'question.isGuest',
    )
    .where({ survey_id: id });
};

getQuestionsAnswers = (id) => {
  return db('questions')
    .join('questionAnswers', 'questionAnswers.question_id', '=', 'questions.id')
    .select('questions.question', 'questionAnswers.answer')
    .where({ question_id: id });
};

getSurveyResponse = (id) => {
  return baseQuery()
    .join('questions', 'questions.survey_id', '=', 'survey.id')
    .join('questionAnswers', 'questionAnswers.question_id', '=', 'questions.id')
    .select(
      'survey.name',
      'questions.question',
      'survey.isGuest',
      'questions.question',
      'questionAnswers.answer',
    )
    .where({ survey_id: id, question_id: id });
};

export {
  getSurvey,
  getAllSurveys,
  getSurveyQuestions,
  getSurveyResponse,
  getQuestionsAnswers,
};