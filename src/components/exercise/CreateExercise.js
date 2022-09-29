import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import './style.css'
import client from '../../utils/client'

const CreateExercise = () => {
    const [objectives, setObjectives] = useState(1)
    const [name, setName] = useState('')
    const [gitHubUrl, setGitHubUrl] = useState('')
    const [obj] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        client
            .post(`/exercise`, { name, gitHubUrl, objectives: obj })
    }

    const editObj = (e, i) => obj[i] = e

    return (
        <div>
            <h1>Create New Exercise</h1>
            <form className='form' onSubmit={handleSubmit}>
                <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="GitHub URL"
                    variant="standard"
                    onChange={(e) => setGitHubUrl(e.target.value)}
                />
                <Button variant="contained" onClick={() => setObjectives(objectives + 1)}>Add Objective</Button>
                {Array(objectives).fill('Quack').map((_, i) => {
                    return (
                        <TextField
                            id="standard-basic"
                            label={`Objective ${i + 1}`}
                            variant="standard"
                            onChange={(e) => editObj(e.target.value, i)}
                        />
                    )
                })}
                <Button variant="contained" color='success' type='submit'>Submit Exercise</Button>
            </form>
        </div>
    )
}

export default CreateExercise