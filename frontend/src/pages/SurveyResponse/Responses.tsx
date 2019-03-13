import React from 'react';
import Response from './Response';
import { useFetch } from '../../helpers';
import loadingIndicator from '../utils/loading.svg';
import './SurveyResponse.css';


const Responses = (props:any) => {
    return(
        <div className='responses-container'>
            <div className='responses-guest'>
                <div className='responses-img'>
                    <img src = {props.sr_img} />
                </div>
                <div className='responses-info'>
                    <p>{props.sr_name}</p>
                    <p>{props.sr_date}</p>
                </div>
            </div>
            <div className = 'responses-answers'>
                <Response question = {props.question} answer = {props.answer} answerType={props.answerType}/>
            </div>
        </div>
    )
}

export default Responses;