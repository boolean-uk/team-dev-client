import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import Header from '../Header/Header';
import client from '../../utils/client';
import PasswordForm from '../profile/PasswordForm.js';
import './profile.css';

const Profile = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const params = useParams();
  const [userData, setUserData] = useState({});
  const [cohortsAvailable, setCohortsAvailable] = useState([]);

  const [isValidId, setIsValidId] = useState(true);

  useEffect(() => {
    client
      .get(`/user/${params.id}`)
      .then((res) => {
        setUserData(res.data.data.user);
      })
      .catch((err) => {
        setIsValidId(false);
        console.log(err.response);
      });
  }, [params]);

  useEffect(() => {
    client
      .get('/cohort')
      .then((res) => {
        setCohortsAvailable(res.data.data);
      })
      .catch((err) => console.error(err.response));
  }, []);

  const handleSubmitAddStudentToCohort = (e) => {
    e.preventDefault();

    const selectedCohortId = Number(e.target[0].value);

    client.patch(`/user/${userData.id}`, { cohort_id: selectedCohortId });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (editingProfile) {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    client
      .patch(`/user/update/${userData.id}`, userData, false)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.error(err.response))
      .finally(() => setEditingProfile(false));
  };

  return (
    <>
      <Header />

      <form
        onSubmit={handleSubmitAddStudentToCohort}
        className='add-user-to-cohort-form'
      >
        <span>Add student to cohort: </span>
        <select>
          <option value={null}>Please select a cohort...</option>
          {cohortsAvailable &&
            cohortsAvailable.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.id}
              </option>
            ))}
        </select>
        <button type='submit' className='add-user-to-cohort-btn'>
          Confirm
        </button>
      </form>

      {!isValidId && <h2>This is an invalid ID</h2>}

      {!editingPassword && isValidId && (
        <div className='profile-form'>
          <img
            className='img-profile'
            alt='img-profile'
            src={userData.profile_url}
          />
          <TextField
            className='profile-user-text'
            label='First Name'
            name='first_name'
            value={userData.first_name}
            onChange={handleChange}
          />
          <TextField
            className='profile-user-text'
            label='Last Name'
            name='last_name'
            value={userData.last_name}
            onChange={handleChange}
          />
          <TextField
            className='profile-user-text'
            type='email'
            label='Email'
            name='email'
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            className='profile-user-text'
            label='Bio'
            name='biography'
            value={userData.biography}
            onChange={handleChange}
          />
          <TextField
            className='profile-user-text'
            type='url'
            label='GitHub URL'
            name='github_url'
            value={userData.github_url}
            onChange={handleChange}
          />

          {editingProfile && (
            <Button
              id='user-submit-button'
              onClick={handleSubmit}
              type='submit'
              variant='contained'
            >
              Submit
            </Button>
          )}

          {!editingProfile && (
            <Box>
              <Stack spacing={2} direction='row'>
                <Button
                  variant='contained'
                  onClick={() => setEditingProfile(true)}
                >
                  Edit Profile
                </Button>{' '}
              </Stack>
            </Box>
          )}

          {!editingPassword && isValidId && (
            <Box>
              <Stack spacing={2} direction='row'>
                <Button
                  variant='contained'
                  onClick={() => setEditingPassword(true)}
                >
                  Edit Password
                </Button>{' '}
              </Stack>
            </Box>
          )}
        </div>
      )}

      {editingPassword && <PasswordForm userData={userData} />}
    </>
  );
};

export default Profile;
