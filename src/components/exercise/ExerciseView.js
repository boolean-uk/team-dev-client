import { useLocation } from 'react-router-dom'
import client from '../../utils/client'
import { useEffect, useState } from 'react'
import { Link, Checkbox } from '@mui/material';

const ExerciseView = () => {
    const location = useLocation()
    const [currentExercise, setCurrentExercise] = useState({})
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    useEffect(() => {
        client
            .get(`/exercise/${location.state.id}`)
            .then(res => setCurrentExercise(res.data.data.exercise))
    }, [location.state.id]);

    if (!currentExercise.objectives) {
        console.log('current exercise objective empty')
        return <></>
    }

    return (
        <div className='exercise'>
            <h1>{currentExercise.name}</h1>
            <h3 style={{ textAlign: 'start' }}>Learning Objectives</h3>
            <div>{currentExercise.objectives.map((o, i) => {
                return (
                    <div className='objective' key={o.id}>
                        <p>{i + 1}. {o}</p>
                        <Checkbox {...label} />
                    </div>
                )
            })}</div>
            <Link href={currentExercise.gitHubUrl} underline="hover">Go to GitHub</Link>
        </div>
    )
}

export default ExerciseView