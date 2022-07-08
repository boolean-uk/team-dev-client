import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import client from '../../utils/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCohortForm = () => {
  let navigate = useNavigate()
  const [cohortFormData, setCohortFormData] = useState({ 
    cohort_name: '', start_date: '', end_date: ''  
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    client
      .post('/cohort', cohortFormData)
      .then((res) => {
        const cohortId  = res.data.data.cohort.id
        navigate(`../cohorts/${cohortId}`, { replace: true })
      })
      .catch((err) => console.error(err.response))
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setCohortFormData({
      ...cohortFormData,
      [name]: value,
    });
  };

  return (
      <>
        <Header companyName={`Cohort Manager 2.0`} />
        <form className='add-cohort-form' onSubmit={handleSubmit}>
        <TextField
            value={cohortFormData.cohort_name}
            className='cohort-form'
            type='text'
            label='New cohort name'
            variant='outlined'
            name='cohort_name'
            onChange={handleChange}
        />

        <TextField
            value={cohortFormData.start_date}
            className='cohort-form'
            label="Start Date"
            name='start_date'
            type="date"
            onChange={handleChange}
            sx={{ width: 220 }}
        />

        <TextField
            value={cohortFormData.end_date}
            className='cohort-form'
            label="End Date"
            name='end_date'
            type="date"
            onChange={handleChange}
            sx={{ width: 220 }}
        />

        <Button type='submit' variant='contained'>Save</Button>
        </form>
      </>
  );
};

export default AddCohortForm;
