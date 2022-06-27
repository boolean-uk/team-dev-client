import { React, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Header from '../Header/Header';
import client from '../../utils/client';

const Profile = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  });

  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    client
      .get(`/user/${params.id}`)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.log(err.response));
  }, [params]);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    const { value, name } = event.target;

    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  console.log(passwords);

  const handleSubmit = (event) => {
    event.preventDefault();

    client
      .patch(`/user/update/${userData.id}`, userData, false)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.log(err.response))
      .finally(() => setEditingProfile(false));
  };
  // currentPassword,
  // userData.passwordHash

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const { currentPassword, newPassword, newPasswordConfirmation } = passwords;
    console.log('currentPassword : ', currentPassword);

    alert('Outside isPasswordValid');

    console.log('userData.passwordHash : ', userData.passwordHash);

    if (newPassword !== newPasswordConfirmation) {
      alert('Passwords do not match');

      return;
    }
  };

  const fieldVariant = editingProfile ? 'outlined' : 'standard';

  return (
    <>
      <Header />
      {!editingPassword && (
        <form className='user-form'>
          <TextField
            className='user-form-input'
            label='First Name'
            name='first_name'
            value={userData.first_name}
            onChange={editingProfile ? handleChange : undefined}
            variant={fieldVariant}
          />
          <TextField
            className='user-form-input'
            label='Last Name'
            name='last_name'
            value={userData.last_name}
            onChange={editingProfile ? handleChange : undefined}
            variant={fieldVariant}
          />
          <TextField
            className='user-form-input'
            type='email'
            label='Email'
            name='email'
            value={userData.email}
            onChange={editingProfile ? handleChange : undefined}
            variant={fieldVariant}
          />

          <TextField
            className='user-form-input'
            label='Bio'
            name='biography'
            value={userData.biography}
            onChange={editingProfile ? handleChange : undefined}
            variant={fieldVariant}
          />
          <TextField
            className='user-form-input'
            type='url'
            label='GitHub URL'
            name='github_url'
            value={userData.github_url}
            onChange={editingProfile ? handleChange : undefined}
            variant={fieldVariant}
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

          {!editingPassword && (
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
        </form>
      )}

      {editingPassword && (
        <form>
          <TextField
            className='user-form-input'
            type='text'
            label='current password'
            name='currentPassword'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <TextField
            className='user-form-input'
            type='text'
            label='new password'
            name='newPassword'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <TextField
            className='user-form-input'
            type='text'
            label='new password'
            name='newPasswordConfirmation'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <Button
            id='user-submit-button'
            onClick={handlePasswordSubmit}
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
        </form>
      )}
    </>
  );
};

export default Profile;
