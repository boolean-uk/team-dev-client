import PasswordForm from '../profile/PasswordForm.js';
import { Button, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';

const ProfileSection = ({
  isValidId,
  editingPassword,
  handleChange,
  handleSubmit,
  setEditingPassword,
  userData,
  editingProfile,
  setEditingProfile,
}) => {
  return (
    <div>
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
            inputProps={{ readOnly: !editingProfile ? true : false }}
            InputLabelProps={{ shrink: true }}
            variant='outlined'
          />
          <TextField
            className='profile-user-text'
            label='Last Name'
            name='last_name'
            value={userData.last_name}
            onChange={handleChange}
            inputProps={{ readOnly: !editingProfile ? true : false }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className='profile-user-text'
            label='Email'
            name='email'
            value={userData.email}
            onChange={handleChange}
            inputProps={{ readOnly: !editingProfile ? true : false }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className='profile-user-text'
            label='Biography'
            name='biography'
            value={userData.biography}
            onChange={handleChange}
            inputProps={{ readOnly: !editingProfile ? true : false }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            className='profile-user-text'
            label='Github URL'
            name='gitgub_url'
            value={userData.github_url}
            onChange={handleChange}
            inputProps={{ readOnly: !editingProfile ? true : false }}
            InputLabelProps={{ shrink: true }}
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
                </Button>
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
                </Button>
              </Stack>
            </Box>
          )}
        </div>
      )}

      {editingPassword && <PasswordForm userData={userData} />}
    </div>
  );
};

export default ProfileSection;
