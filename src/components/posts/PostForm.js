import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleSwitch from './utils/ToggleSwitch';
const switchLabel = 'Post privately'

const PostForm = ({ handleSubmit, handleChange, value }) => {
  return (
    <>
      <form className='post-form' onSubmit={handleSubmit}>
        <TextField
          className='user-form-input'
          type='text'
          label='New Post'
          variant='outlined'
          name='content'
          value={value.content}
          onChange={handleChange}
        />
        <ToggleSwitch val={value} name='isPrivate' labelText={switchLabel} handleChange={handleChange} />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default PostForm;
