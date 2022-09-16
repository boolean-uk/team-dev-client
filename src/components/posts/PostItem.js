import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { deletePost } from './utils/deletePost';
import { editPost } from './utils/editPost';

const deleteBtnText = 'Delete'
const confirmDeleteBtnText = 'Confirm Delete?'
const delBtnStyle = { text: deleteBtnText, color: 'primary' }
const confirmDelStyle = { text: confirmDeleteBtnText, color: 'error' }

const PostItem = ({ post, userId, setPostResponse, setPost }) => {
  const [isOwner, setIsOwner] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(post.content)
  const [editStyle, setEditStyle] = useState({text: 'Edit', color: 'primary'})
  const [delStyle, setDelStyle] = useState(delBtnStyle)

  useEffect(() => {
    const getUserId = userId();
    setIsOwner(false)
    setIsDeleting(false)
    setContent(post.content)
    setDelStyle(delBtnStyle)
    if (getUserId === post.userId) {
      setIsOwner(true)
    }
  }, [post, userId])

  const handleChange = (e) => {
    e.preventDefault()
    const {value} = e.target
    setContent(value)
  }

  const handleEdit = (e) => {
    if (!isEditing) {
      setEditStyle({
        text: 'Save',
        color: 'success'
      })
      setIsEditing(true)
    }
    else {
        editPost(setPostResponse, post.id, content)
        setEditStyle({
          text: 'Edit',
          color: 'primary'
        })
        setIsEditing(false)
    }
  }

  const handleDel = () => {
    if (!isDeleting) {
      setDelStyle(confirmDelStyle)
      setIsDeleting(true)
    }
    else {
      deletePost(setPostResponse, post.id)
      setIsDeleting(false)
    }
  }

  return (
    <li className='post-item'>
      <div className='post-header-wrap'>
        <div className='post-profile-wrap'>
          <img
            className='post-profile-img'
            src={post.user.profile.profileImageUrl}
            alt='profile'
          />
          <h3>
            {post.user.profile.firstName} {post.user.profile.lastName}
          </h3>
        </div>

        <p className='createdAt-time'>{post.createdAt}</p>
      </div>
      { isEditing ? 
      <TextField multiline value={content} onChange={handleChange}/>
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
    </li>
  );
};

export default PostItem;
