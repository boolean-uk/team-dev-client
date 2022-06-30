import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import client from '../../utils/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddCohortForm = () => {
  let navigate = useNavigate()
  const [cohortFormData, setCohortFormData] = useState({ cohort_name: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    client
      .post('/cohort', cohortFormData)
      .then((res) => {
        navigate(`../cohorts/${res.data.data.cohort.id}`, { replace: true })
      })
      .catch((data) => console.log(data));
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
            className='user-form-input'
            type='text'
            label='New cohort name'
            variant='outlined'
            name='cohort_name'
            onChange={handleChange}
        />
        <Button type='submit' variant='contained'>Save</Button>
        </form>
      </>
  );
};

export default AddCohortForm;
