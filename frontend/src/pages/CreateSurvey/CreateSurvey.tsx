import React, {useState} from 'react';
import SurveyQuestion from './SurveyQuestion'
import { useFetch, axiosFetch }  from '../../helpers/'
import axios, { AxiosRequestConfig } from 'axios';
import { async } from 'q';
const CreateSurvey = ()=>{
    const [dropdown, setDropdown] = useState('3')
    const [surveyName, setSurveyName] = useState('')
    const [survey, setSurvey] = useState([])
    const[id, setId] = useState(1)
    const [questionType1, setQuestionType1] = useState(1)
    const [questionType2, setQuestionType2] = useState(1)
    const [questionType3, setQuestionType3] = useState(1)
    const [question1, setQuestion1] = useState('')
    const [question2, setQuestion2] = useState('')
    const [question3, setQuestion3] = useState('')
    const [isGuest, setIsGuest] = useState(true)
    const [fetch, setFetch] = useState(false)
    const url = process.env.REACT_APP_backendURL || 'https://labs10-cleaner-app-2.herokuapp.com';

    async function handleSubmit(surveyName: string, isGuest: boolean, dropdown: string) {
        if(!surveyName){
            return console.log('missing survey name')
        }
        const body: any = {
            name: surveyName,
            isGuest: isGuest,
        }
        const headers: AxiosRequestConfig = {
            headers: {
                Authorization: localStorage.getItem('token'),
            },
        };
        const data = await axios.post(`${url}/surveys`, body,headers)
        setId(data.data.id)
        setFetch(true)
        console.log(data)
        async function handleQuestions(question: string, type: number, id: number){
            if(!question){
                return console.log('missing question')
            }
            const body: any = {
                question: question,
                type: type,
                survey_id: id
            }
            const data = await axios.post(`${url}/questions`, body, headers)
            console.log(data)
        }
        if(dropdown ==='1'){
            handleQuestions(question1,questionType1, id)
        }
        if (dropdown === '2') {
            handleQuestions(question1, questionType1, id)
            handleQuestions(question2, questionType2, id)
        }
        if(dropdown === '3'){
            handleQuestions(question1, questionType1, id)
            handleQuestions(question2, questionType2, id)
            handleQuestions(question3, questionType3, id)
        }
    }
    const questionLength = (num: string, survey: any) => {
        for (let i = 0; i <= survey.length+1; i++) {
            survey.pop()
        }
        if(num === '1'){
            survey.push(<SurveyQuestion key={1} 
                questionNumber={1} 
                setQuestionType = {setQuestionType1} 
                setQuestion = {setQuestion1} />)
        }
        if (num === '2') {
            survey.push(<SurveyQuestion key={1} 
                questionNumber={1} 
                setQuestionType = {setQuestionType1} 
                setQuestion = {setQuestion1} />)
            survey.push(<SurveyQuestion key={2} 
                questionNumber={2} 
                setQuestionType = {setQuestionType2} 
                setQuestion = {setQuestion2} />)
        }
        if (num === '3') {
            survey.push(<SurveyQuestion key={1} 
                questionNumber={1} 
                setQuestionType = {setQuestionType1} 
                setQuestion = {setQuestion1}/>)
            survey.push(<SurveyQuestion key={2} 
                questionNumber={2} 
                setQuestionType = {setQuestionType2} 
                setQuestion = {setQuestion2} />)
            survey.push(<SurveyQuestion key={3} 
                questionNumber={3} 
                setQuestionType = {setQuestionType3} 
                setQuestion = {setQuestion3} />)
        }
        const answer = survey

        return answer
    }
        return (
            <div>
                <form onSubmit={() => handleSubmit(surveyName, isGuest, dropdown)}>
                    <h1>Create a Survey</h1>
                    <h2>Survey Name</h2>
                    <input type='text' placeholder='Survey Name' onChange={(event: any) => { setSurveyName(event.target.value) }}/>
                    <div>
                        <h3>Survey Type:</h3>
                        <button type='button' name='guest' onClick={() => setIsGuest(true)}>Guest Survey</button>
                        <button type='button' name='assistant' onClick={() => setIsGuest(false)}>Assitant Survey</button>
                        <h3>How Many Questions:</h3>
                        <select defaultValue='3' onChange={(event: any) => {
                            event.preventDefault()
                            setDropdown(event.target.value)
                        }}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div>
                       {questionLength(dropdown, survey)}
                    </div>
                    <div>
                        <button type = 'button' onClick={() => handleSubmit(surveyName, isGuest, dropdown)}>Save</button>
                        <button>Cancel</button>
                    </div>
                </form>
            </div>
        )
    
}
export default CreateSurvey