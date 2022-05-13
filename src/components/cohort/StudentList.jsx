import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../utils/client';
import './studentList.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function StudentList(props) {
  const { userId } = props;
  const [cohortStudents, setCohortStudents] = useState([]);
  const [cohortId, setCohortId] = useState();

  useEffect(() => {
    client
      .get(`/user/${userId}`)
      .then((res) => getCohortStudents(res.data.data.user.cohort_id))
      .catch((err) => console.log(err.response));
  }, []);

  function getCohortStudents(userCohortId) {
    setCohortId(userCohortId);
    client
      .get(`/user/student?cohort=${userCohortId}`)
      .then((res) => setCohortStudents(res.data.data))
      .catch((err) => console.log(err.response));
  }

  // Added this for students who have not yet been assigned a cohort
  if(cohortId === null) {
    return <></>
  }

  return (
    <>
      <div className='big-container-student-table'>
        <div className='big-container-title'>
          <h3>Cohort {cohortId} Students</h3>
        </div>
        <nav id='list-of-students-main-page'>
          {cohortStudents.map((student, index) => (
            <div key={index} className='student-in-list-main-page'>
              <div className='list-of-students-main-page-avatar'>
                <Link to={`/user/${student.user.id}`}>
                  <Avatar>
                    {student.user.firstName[0].toUpperCase()}
                    {student.user.lastName[0].toUpperCase()}
                  </Avatar>
                </Link>
              </div>
              <div className='list-of-students-main-page-fullName'>
                <Link to={`/user/${student.user.id}`}>
                  <h4>
                    {student.user.firstName[0].toUpperCase() +
                      student.user.firstName.substring(1).toLowerCase()}{' '}
                    {student.user.lastName[0].toUpperCase() +
                      student.user.lastName.substring(1).toLowerCase()}
                  </h4>
                </Link>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};
