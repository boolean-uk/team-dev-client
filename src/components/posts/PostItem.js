import { Avatar, Button, Checkbox, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { deletePost } from './utils/deletePost';
import { editPost } from './utils/editPost';
import { useNavigate } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { createLike, deleteLike } from './utils/likeRequests';

const deleteBtnText = 'Delete';
const confirmDeleteBtnText = 'Confirm Delete?';
const delBtnStyle = { text: deleteBtnText, color: 'primary' };
const confirmDelStyle = { text: confirmDeleteBtnText, color: 'error' };

const PostItem = ({ post, userId, setPostResponse, setPost, setProfileView }) => {
  const [isOwner, setIsOwner] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(post.content)
  const [editStyle, setEditStyle] = useState({ text: 'Edit', color: 'primary' })
  const [delStyle, setDelStyle] = useState(delBtnStyle)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState('')
  const navigate = useNavigate()
  const getUserId = userId();
  
  useEffect(() => {
    setIsOwner(false);
    setIsDeleting(false);
    setContent(post.content);
    setDelStyle(delBtnStyle);
    setLikesCount(post.likes.length)
    if (getUserId === post.userId) {
      setIsOwner(true);
    }
  // eslint-disable-next-line
  }, [post, userId]);

  const handleChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setContent(value)
  }

  const handleEdit = e => {
    if (!isEditing) {
      setEditStyle({
        text: 'Save',
        color: 'success',
      });
      setIsEditing(true);
    } else {
      editPost(setPostResponse, post.id, content);
      setEditStyle({
        text: 'Edit',
        color: 'primary',
      });
      setIsEditing(false);
    }
  };

  const handleDel = () => {
    if (!isDeleting) {
      setDelStyle(confirmDelStyle);
      setIsDeleting(true);
    } else {
      deletePost(setPostResponse, post.id);
      setIsDeleting(false);
    }
  };

  const handleClick = (e) => {
    setProfileView(post.userId)
    navigate('/profile')
  }

  const handleLike = (e) => {
    setIsLiked(e.target.checked)

    if(!isLiked) {
      createLike(setPostResponse, post.id)
    }
    else {
      deleteLike(setPostResponse, post.id)
    }
  }

  return (
    <li className="post-item">
      <div className="post-header-wrap">
        <div className="post-profile-wrap">
          <Avatar
            src={post.user.profile.profileImageUrl}
            alt="profile"
            sx={{ width: 56, height: 56 }}
          />
          <h3 onClick={handleClick} className="post-owner-name">
            {post.user.profile.firstName} {post.user.profile.lastName}
          </h3>
        </div>

        <p className="createdAt-time">{post.createdAt}</p>
      </div>
      {isEditing ?
        <TextField multiline value={content} onChange={handleChange} />
        :
        <p className='post-content'>{post.content}</p>
      }
      {isOwner && <div className="modify-btn-wrap">
        <Button
          color={editStyle.color}
          variant='text'
          id={'post-edit-btn' + post.id}
          onClick={handleEdit}
          className="modify-btn">{editStyle.text}</Button>
        <Button
          variant='text'
          color={delStyle.color}
          className="modify-btn"
          onClick={handleDel}
        >{delStyle.text}
        </Button>
      </div>}
      <div className='like-wrap'>
        <Checkbox 
          label='like' 
          icon={<ThumbUpOutlinedIcon />} 
          checkedIcon={<ThumbUpIcon />} 
          checked={isLiked}
          onChange={handleLike}/>
        <div className='count'>{likesCount}</div>
      </div>
    </li>
  );
};

export default PostItem;
