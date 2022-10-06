import { useLocation, useNavigate } from 'react-router-dom'
import client from '../../utils/client'
import { useEffect, useState } from 'react'
import { Link, Checkbox } from '@mui/material';
import ReactMarkdown from 'react-markdown'

const ExerciseView = () => {
    const location = useLocation()
    const navigate = useNavigate()
    
    const [currentExercise, setCurrentExercise] = useState({});
    const [readMe, setReadMe] = useState('')
    const [logList, setLogList] = useState([])
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const isValidUrl = urlString=> {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i'); 
    return urlPattern.test(urlString);
  }

    useEffect(() => {
        client
            .get(`/exercise/${location.state.id}`)
            .then(res => setCurrentExercise(res.data.data.exercise))
    }, [location.state.id]);

    useEffect(() => {
        if(isValidUrl(currentExercise.readMeUrl)){
            fetch(`${currentExercise.readMeUrl}`)      
            .then(response => response.blob())  
            .then(blob => blob.text())          
            .then(markdown => {                
                setReadMe(markdown);
            });
        }

        else {
            setReadMe('')
        }
    }, [currentExercise]);

    useEffect(() => {
        client
            .get(`/log?exerciseId=${location.state.id}`)
            .then(res => setLogList(res.data.data.logs))
    }, [location.state.id])

    const handleClick = (log) => navigate(`/cohort/${log.cohortId}`)

    if (!currentExercise.objectives) {
        return <></>
    }


    return (
        <div className='exercise'>
            <h1>{currentExercise.name}</h1>
            <h3 style={{ textAlign: 'start' }}>Learning Objectives:</h3>
            <div>{currentExercise.objectives.map(o => {
                return (
                    <div className='objective' key={o.id}>
                        <Checkbox {...label} />
                        <p>{o}</p>
                    </div>
                )
            })}</div>
            <h3 style={{ textAlign: 'start' }}>Logs:</h3>
            <div className='log-list'>{logList && logList.map(l => {
                return (
                    <p key={l.id} onClick={() => handleClick(l)}>{l.date}</p>
                )
            })}</div>
            <Link href={currentExercise.gitHubUrl} underline="hover">Go to GitHub Repository</Link>
            <ReactMarkdown className='exercise-readme'>{readMe}</ReactMarkdown>
        </div>
    )
}

export default ExerciseView