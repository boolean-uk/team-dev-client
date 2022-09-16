import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { deletePost } from './utils/deletePost';
import { editPost } from './utils/editPost';

const deleteBtnText = 'Delete';
const confirmDeleteBtnText = 'Confirm Delete?';

const PostItem = ({ post, userId, setPostResponse, setPost }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(post.content);
  const [editStyle, setEditStyle] = useState({
    text: 'Edit',
    color: 'primary',
  });

  useEffect(() => {
    const getUserId = userId();
    setIsOwner(false);
    setIsDeleting(false);
    setContent(post.content);
    if (getUserId === post.userId) {
      setIsOwner(true);
    }
  }, [post, userId]);

  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setContent(value);
  };

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
    const button = document.getElementById('post-delete-btn' + post.id);
    if (!isDeleting) {
      button.style.color = 'red';
      button.style.fontWeight = 'bold';
      button.innerText = confirmDeleteBtnText;
      setIsDeleting(true);
    } else {
      deletePost(setPostResponse, post.id);
      button.style.color = '#3e3e3e';
      button.style.fontWeight = 'normal';
      button.innerText = deleteBtnText;
      setIsDeleting(false);
    }
  };

  return (
    <li className="post-item">
      <div className="post-header-wrap">
        <div className="post-profile-wrap">
          <img
            className="post-profile-img"
            src={post.user.profile.profileImageUrl}
            alt="profile"
          />
          <h3>
            {post.user.profile.firstName} {post.user.profile.lastName}
          </h3>
        </div>

        <p className="createdAt-time">{post.createdAt}</p>
      </div>
      {isEditing ? (
        <TextField multiline value={content} onChange={handleChange} />
      ) : (
        <p className="post-content">{post.content}</p>
      )}
      {isOwner && (
        <div className="modify-btn-wrap">
          <Button
            color={editStyle.color}
            variant="text"
            id={'post-edit-btn' + post.id}
            onClick={handleEdit}
            className="modify-btn"
          >
            {editStyle.text}
          </Button>
          <button
            id={'post-delete-btn' + post.id}
            className="modify-btn"
            onClick={handleDel}
          >
            {deleteBtnText}
          </button>
        </div>
      )}
    </li>
  );
};

export default PostItem;
