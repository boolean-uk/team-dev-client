import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import client from '../../utils/client';

const CommentItem = ({ comment, setUser }) => {
  const navigate = useNavigate();
  
  const handleClick = e => {
    client
      .get(`/user/${comment.userId}`)
      .then(res => setUser(res.data.data.user))
      .catch(err => console.log(err));
    navigate('/profile');
  };

  return (
    <li className='comment-item'>
      <div className='comment-avatar'>
        <Avatar
          src={comment.user.profile.profileImageUrl}
          alt='profile'
          sx={{ width: 35, height: 35 }}
        />
      </div>
      <div className='comment-content-wrap'>
        <h4 onClick={handleClick} className='post-owner-name'>
          {comment.user.profile.firstName} {comment.user.profile.lastName}
        </h4>
        <p className='createdAt-time'> &#183; {comment.formattedCreatedAt}</p>
        <p className='comment-content'>{comment.content}</p>
      </div>
    </li>
  )
}

export default CommentItem