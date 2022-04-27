import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

const PostForm = ({ handleSubmit, handleChange }) => {
<<<<<<< HEAD

  return (
    <form className="post-form" onSubmit={ handleSubmit }>
      <TextField className="user-form-input" type="text" label="New Post" variant="outlined" name="content" onChange={ handleChange } />
      <Button type="submit" variant="contained">Submit</Button>
    </form>
  )
}
=======
  return (
    <Box sx={{ width: '50vw', margin: '0 auto' }}>
      <form className='post-form' onSubmit={handleSubmit}>
        <TextField
          className='user-form-input'
          type='text'
          label='New Post'
          variant='outlined'
          name='content'
          onChange={handleChange}
        />
        <Button sx={{ marginTop: '2em' }} type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </Box>
  );
};
>>>>>>> 872aa68296939f956c30bf4e44bbd8081a0d2e66

export default PostForm;
