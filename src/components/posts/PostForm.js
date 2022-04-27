<<<<<<< HEAD
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
=======
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
>>>>>>> 67d669401e979cacce8d3673ec38590a937c4f39

const PostForm = ({ handleSubmit, handleChange }) => {
  return (
    <Box sx={{ width: "50vw", margin: "0 auto" }}>
      <form className="post-form" onSubmit={handleSubmit}>
        <TextField
          className="user-form-input"
          type="text"
          label="New Post"
          variant="outlined"
          name="content"
          onChange={handleChange}
        />
        <Button sx={{ marginTop: "2em" }} type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PostForm;
