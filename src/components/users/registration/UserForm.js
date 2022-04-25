import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const UserForm = ({ handleSubmit, handleChange }) => {
  return (
    <Box>
      <form className='user-form' onSubmit={handleSubmit}>
        <TextField
          className='user-form-input'
          label='First Name'
          variant='outlined'
          name='first_name'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          label='Last Name'
          variant='outlined'
          name='last_name'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          type='email'
          label='Email'
          variant='outlined'
          name='email'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          type='password'
          label='Password'
          variant='outlined'
          name='password'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          label='Bio'
          variant='outlined'
          name='biography'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          type='url'
          label='GitHub URL'
          variant='outlined'
          name='github_url'
          onChange={handleChange}
        />
        <Button id='user-submit-button' type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
