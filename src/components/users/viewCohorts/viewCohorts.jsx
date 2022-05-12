import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './viewCohort.css';
import client from '../../../utils/client';
import Table from './components/Table';
import { Box, Grid } from '@mui/material';
import NoCohortList from './components/NoCohortList';

export default function ViewCohort() {
  const { id } = useParams();
  const [noCohort, setNoCohort] = useState([]);
  const [cohortStudents, setCohortStudents] = useState([]);
  const [resetStudents, setResetStudents] = useState(0);
  const [cohortInfo, setCohortInfo] = useState({});

  useEffect(() => {
    client
      .get('/user/student?cohort=none')
      .then((res) => setNoCohort(res.data.data))
      .catch((err) => console.log(err.response));

    client
      .get(`/user/student?cohort=${id}`)
      .then((res) => setCohortStudents(res.data.data))
      .catch((err) => console.log(err.response));

    client
      .get(`/cohort?id=${id}`)
      .then((res) => setCohortInfo(res.data.data))
      .catch((err) => console.log(err.response));
  }, [resetStudents]);

  function addStudent(studentId) {
    const data = { cohort_id: id };
    client
      .patch(`/user/${studentId}/cohort`, data)
      .then((res) => {
        setResetStudents(resetStudents + 1);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Box className='BigContainer'>
          <div className='Container_cohorts'>
            <div className='Parent-title-container'>
              <div className='cohort-title'>
                <h3>Cohort {id}</h3>
              </div>
              <div className='cohort-size-text'>
                Number of students: {cohortStudents.length}
              </div>
            </div>
            <div className='cohort-student-big-table'>
              <Table cohortStudents={cohortStudents} />
            </div>
          </div>
          <NoCohortList noCohort={noCohort} addStudent={addStudent} />
        </Box>
      </Grid>
    </>
  );
};
