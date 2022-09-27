import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import client from '../../utils/client';
import { formatTime } from './utils/getAllPosts';

const CommentItem = ({ comment }) => {
  const navigate = useNavigate();

  const handleClick = e => {
    client
      .get(`/user/${comment.userId}`)
      .then(res => navigate('/profile', { state: { user: res.data.data.user } }))
      .catch(err => console.error(err.response));
    ;
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
        <p className='createdAt-time'> &#183; {formatTime(comment.createdAt)}</p>
        <p className='comment-content'>{comment.content}</p>
      </div>
    </li>
  );
};

export default CommentItem;
