import { Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import client from '../../utils/client'
import { useNavigate } from 'react-router-dom';

const Exercise = () => {
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        client
            .get(`/exercise`)
            .then(res => setExercises(res.data.data.exercises))
    }, []);

    const handleClick = () => navigate('/exercise/create')

    const handleDelete = (id) => {
        client
            .delete(`/exercise/${id}`)

        navigate('/posts')
    }

    const handleNavigate = (id) => navigate(`/exercise/${id}`, { state: { id } })

    return (
        <div style={{ marginTop: '2rem' }}>
            <Button variant="contained" color="success" onClick={handleClick}>
                Create New Exercise
            </Button>
            <List className='exercise-list'>
                {exercises.map((e) => {
                    return (
                        <div key={e.id}>
                            <ListItem button onClick={() => handleNavigate(e.id)}>
                                <ListItemText primary={e.name} />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(e.id)}
                                >
                                    DELETE
                                </Button>
                            </ListItem>
                            <Divider color='white' />
                        </div>
                    )
                })}
            </List>
        </div>
    )
}

export default Exercise