import React from 'react';
import Button from '@mui/material/Button';
import './addCohort.css';
import client from '../../utils/client';
import { useNavigate } from 'react-router-dom';

export default function AddCohort() {
  let navigate = useNavigate();
  const btnStyle = {
    height: 280,
    width: 280,
    borderRadius: '50%',
    backgroundColor: 'red',
  };

  const addCohortHandle = () => {
    client
      .post('/cohort', {})
      .then((res) => {
        let id = res.data.data.cohort.id;
        navigate(`/cohort/${id}`);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className='Big_container'>
      <div className='add-cohort-txt'>
        <h4>Add Cohort</h4>
      </div>
      <Button variant='contained' onClick={addCohortHandle} style={btnStyle}>
        Button
      </Button>
    </div>
  );
}
