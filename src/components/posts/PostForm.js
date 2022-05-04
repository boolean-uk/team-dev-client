import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const PostForm = ({ handleSubmit, handleChange, post }) => {
  return (
    <Box sx={{ width: '50vw', margin: '0 auto' }}>
      <form className='post-form' onSubmit={handleSubmit}>
        <TextField
          className="user-form-input"
          type="text"
          label="New Post"
          variant="outlined"
          name="content"
          onChange={handleChange}
          value={post}
        />
        <Button sx={{ marginTop: '2em' }} type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
