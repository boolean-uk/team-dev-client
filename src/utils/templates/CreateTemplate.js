import { TextField, Button } from '@mui/material';
import './style.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTemplate = ({ templateType }) => {
    const navigate = useNavigate()
    const [objectives, setObjectives] = useState(1)
    const [obj] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/${templateType}`)
    }

    const editObj = (e, i) => obj[i] = e

    return (
        <div className='form-container'>
            <form className='create-form' onSubmit={handleSubmit}>
                <h1>Create new {templateType}</h1>
                <TextField
                    label={templateType !== 'lesson' ? 'Name' : 'Day Number'}
                    variant="outlined"
                    sx={{ width: '400px' }}
                />
                <TextField
                    label={templateType !== 'lesson' ? 'Description' : 'Lesson Plan'}
                    variant="outlined"
                    sx={{ width: '400px' }}
                />
                <Button variant="contained" onClick={() => setObjectives(objectives + 1)}>
                    Add Learning Objective
                </Button>
                {Array(objectives).fill('Quack').map((_, i) => {
                    return (
                        <TextField
                            key={i}
                            id="standard-basic"
                            label={`Learning Objective ${i + 1}`}
                            variant="outlined"
                            onChange={(e) => editObj(e.target.value, i)}
                            sx={{ width: '400px' }}
                        />
                    )
                })}
                <Button variant="contained" color='success' type='submit'>Submit Exercise</Button>
            </form>
        </div>
    )
}

export default CreateTemplate