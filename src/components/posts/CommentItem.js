import { Avatar, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import client from '../../utils/client';
import { formatTime } from './utils/getAllPosts';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useState } from 'react';
import { createCommentLike, deleteCommentLike } from './utils/likeRequests';

const CommentItem = ({ comment, setUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentRes, setCommentRes] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = e => {
    client
      .get(`/user/${comment.userId}`)
      .then(res => setUser(res.data.data.user))
      .catch(err => console.error(err.response));
    navigate('/profile');
  };

  const handleLike = e => {
    setIsLiked(e.target.checked);
    if (!isLiked) {
      createCommentLike(setCommentRes, comment.id);
    } else {
      deleteCommentLike(setCommentRes, comment.id);
    }
  };

  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <Avatar
          src={comment.user.profile.profileImageUrl}
          alt="profile"
          sx={{ width: 35, height: 35 }}
        />
      </div>
      <div className="comment-content-wrap">
        <h4 onClick={handleClick} className="post-owner-name">
          {comment.user.profile.firstName} {comment.user.profile.lastName}
        </h4>
        <p className="createdAt-time">
          {' '}
          &#183; {formatTime(comment.createdAt)}
        </p>
        <p className="comment-content">{comment.content}</p>
      </div>
      <div className="comment-like-wrap">
        <Checkbox
          label="like"
          checked={isLiked}
          icon={<ThumbUpOutlinedIcon />}
          checkedIcon={<ThumbUpIcon />}
          onChange={handleLike}
        />
        <div className="count">{likesCount}</div>
      </div>
    </li>
  );
};

export default CommentItem;
