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

    return (
        <div style={{ marginTop: '2rem' }}>
            <Button variant="contained" color="success" onClick={handleClick}>
                Create New Exercise
            </Button>
            <List>
                {exercises.map((e, i) => {
                    return (
                        <div key={i}>
                            <ListItem button>
                                <ListItemText primary={e.name} />
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