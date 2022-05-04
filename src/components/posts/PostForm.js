import React from 'react';
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

const PostForm = ({ handleSubmit, handleChange, post }) => {
  return (
    <Box sx={{ width: "50vw", margin: "0 auto" }}>
      <form className="post-form" onSubmit={handleSubmit}>
        <textarea col="20" rows="8"
          className="user-form-input"
          type="text"
          label="New Post"
          variant="outlined"
          name="content"
          onChange={handleChange}
          value={post}
        />
        <Button type="submit" variant="contained">
          Post
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
