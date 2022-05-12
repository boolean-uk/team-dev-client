import React from 'react';
import '../viewCohort.css';
import { Box, List } from '@mui/material';
import NoCohortListItem from './NoCohortListItem';

export default function NoCohortList({ noCohort, addStudent }) {
    return (
        <Box className='Container_addStudent'>
            <div className='box-title'>
                <h3>Available students</h3>
            </div>
            <Box className='add-student-container'>
                <List>
                    {noCohort.map((student, index) => (
                        <React.Fragment key={index}>
                            <NoCohortListItem student={student} addStudent={addStudent} />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Box >
    );
};