import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import client from '../../utils/client';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddCohort() {
  const blankForm = {
    cohortName: '',
    startDate: '',
    endDate: '',
  };
  const [cohort, setCohort] = useState(blankForm);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCohort({
      ...cohort,
      [name]: value,
    });
  };
  let navigate = useNavigate();

  const addCohortHandle = (e) => {
    e.preventDefault();
    client
      .post('/cohort', cohort)
      .then((res) => {
        let id = res.data.data.cohort.id;
        navigate(`/cohort/${id}`);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <>
      <section className='edit-user-form'>
        <h1> Add Cohort Details </h1>
        <form onSubmit={addCohortHandle}>
          <TextField
            className='user-form-input'
            value={cohort.cohortName}
            variant='outlined'
            name='cohortName'
            onChange={handleChange}
            placeholder='Cohort name'
          />
          <TextField
            className='user-form-input'
            type='date'
            value={cohort.startDate}
            variant='outlined'
            name='startDate'
            onChange={handleChange}
            placeholder='Start date'
          />
          <TextField
            className='user-form-input'
            type='date'
            value={cohort.endDate}
            variant='outlined'
            name='endDate'
            onChange={handleChange}
            placeholder='End date'
          />
          <Button id='user-submit-button' type='submit' variant='contained'>
            Create Cohort
          </Button>
        </form>
      </section>
    </>
  );
};
