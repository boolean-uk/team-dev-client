import { Avatar, Divider, IconButton, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { createComment } from './utils/createComment';
import { useLoggedInUser } from '../../context/LoggedInUser';

const CommentForm = ({ setPostResponse, post }) => {
  const [commentValue, setCommentValue] = useState('');
  const userLoggedIn = useLoggedInUser().user;
  const isActive = post.user.isActive;

  const handleCommentInput = e => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    createComment(setPostResponse, post.id, commentValue);
    setCommentValue('');
  };

  const inactiveUser = !isActive && userLoggedIn.role === 'STUDENT';

  return (
    <form className="comment-form" onSubmit={handleCommentSubmit}>
      <Avatar
        src={userLoggedIn.profile_image_url}
        alt="user avatar"
        sx={{ width: 35, height: 35 }}
      />
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          borderRadius: 30,
        }}
      >
        <TextField
          multiline
          required
          sx={{ ml: 1, flex: 1 }}
          className="comment-form-textfield"
          placeholder="Comment here..."
          value={commentValue}
          onChange={handleCommentInput}
          inputProps={{ maxLength: 150 }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: '10px' }} disabled={inactiveUser}>
          <SendIcon type="submit" variant="contained" />
        </IconButton>
      </Paper>
    </form>
  );
};

export default CommentForm;
