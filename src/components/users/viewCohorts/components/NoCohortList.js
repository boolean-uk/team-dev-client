import React from 'react';
import '../viewCohort.css';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function NoCohortList({ noCohort, addStudent }) {
    return (
        <Box className='Container_addStudent'>
            <div className='box-title'>
                <h3>Available students</h3>
            </div>
            <Box className='add-student-container'>
                <List>
                    {noCohort.map((student, key) => (
                        <ListItem
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItem: 'center',
                            }}
                            key={key}>

                            <Box sx={{ display: 'flex' }} className='individual-student-box'>
                                <Box>
                                    <Link to={`/user/${student.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                        <Avatar>
                                            {student.user.firstName[0].toUpperCase()}{' '}
                                            {student.user.lastName[0].toUpperCase()}{' '}
                                        </Avatar>
                                    </Link>
                                </Box>
                                <Box>
                                    {`${student.user.firstName} ${student.user.lastName}`}
                                </Box>
                                <Box className='add-student-icon'>
                                    <AddCircleIcon
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => { addStudent(student.user.id) }}
                                        value={student.id}
                                        color='string'
                                        fontSize='large'>
                                    </AddCircleIcon>
                                </Box>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box >
    )
}