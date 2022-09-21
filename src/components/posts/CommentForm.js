import { Avatar, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { createComment } from './utils/createComment';

const PostCommentForm = ({ setPostResponse, post }) => {
  const [commentValue, setCommentValue] = useState('');

  const handleCommentInput = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    createComment(setPostResponse, post.id, commentValue)
    setCommentValue('')
  };
  
  return (
    <form className="comment-form" onSubmit={handleCommentSubmit}>
        <Avatar
            src={post.user.profile.profileImageUrl}
            alt="user avatar"
            sx={{ width: 35, height: 35 }}
        />
        <TextField
            fullWidth 
            multiline
            required
            sx={{ borderRadius: '100%' }}
            placeholder="Comment here..."
            type="text"
            value={commentValue}
            onChange={handleCommentInput}
            inputProps={{ maxLength: 150 }}
        />
        <Button 
            type='submit' 
            variant="contained" 
            endIcon={<SendIcon />}
        > Comment
        </Button>
    </form>
  );
};

export default PostCommentForm;
