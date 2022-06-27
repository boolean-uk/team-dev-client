import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Header from '../Header/Header';
import client from '../../utils/client';

const Profile = () => {
  const params = useParams();
  const [userData, setUserData] = useState({});
  const [cohortsAvailable, setCohortsAvailable] = useState([])

  useEffect(() => {
    client
      .get(`/user/${params.id}`)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.log(err.response));
  }, [params]);

  useEffect(() => {
    client
      .get('/cohort')
      .then((res) => setCohortsAvailable(res.data.data))
      .catch((err) => console.error(err.response));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    client.patch(`/user/${userData.id}`, { cohort_id: e.target[0].value })
  }

  return (
    <>
      <Header />
      <div className='user-form'>
        <TextField
          className='user-form-input'
          variant='outlined'
          value={userData.first_name}
        />
        <TextField
          className='user-form-input'
          variant='outlined'
          value={userData.last_name}
        />
        <TextField
          className='user-form-input'
          type='email'
          variant='outlined'
          value={userData.email}
        />

        <TextField
          className='user-form-input'
          variant='outlined'
          value={userData.biography}
        />
        <TextField
          className='user-form-input'
          type='url'
          variant='outlined'
          value={userData.github_url}
        />

        <form onSubmit={handleSubmit}>
          <span>Add student to cohort: </span> 
          <select>
          <option value={""} selected={userData.cohort_id === null ? "selected" : ""}>Please select a cohort</option>
          {cohortsAvailable && cohortsAvailable.map((cohort) => (
            <option key={cohort.id} value={cohort.id} selected={userData.cohort_id === cohort.id ? "selected" : ""}>{cohort.id}</option>
          ))}
        </select>
        <button type='submit'>Confirm</button>
        </form>

        <Button id='user-submit-button' type='submit' variant='contained'>
          Submit
        </Button>

        <Box>
          <Stack spacing={2} direction='row'>
            <Link to='/edit-profile'>
              <Button variant='contained'>Edit Profile</Button>{' '}
            </Link>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default Profile;
