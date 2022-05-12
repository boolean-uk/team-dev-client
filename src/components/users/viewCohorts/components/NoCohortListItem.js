import React from 'react';
import '../viewCohort.css';
import { Box, ListItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProfileLink from './ProfileLink';

export default function NoCohortListItem({ student, addStudent }) {
    const ListStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItem: 'center'
    };
    return (
        <ListItem sx={ListStyle}>
            <Box sx={{ display: 'flex' }} className='individual-student-box'>
                <Box>
                    <ProfileLink person={student} />
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
    );
};