import { useEffect, useState } from 'react';
import { deletePost } from './utils/deletePost';

const deleteBtnText = 'Delete'
const confirmDeleteBtnText = 'Confirm Delete?'

const PostItem = ({ post, userId, setPostResponse }) => {
  const [isOwner, setIsOwner] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(post.content)

  useEffect(() => {
    const getUserId = userId();
    setIsOwner(false)
    setIsDeleting(false)
    if (getUserId === post.userId) {
      setIsOwner(true)
    }
  }, [post, userId])

  const handleEdit = () => {
    const editBtn = document.getElementById('post-edit-btn' + post.id)
    if (!isEditing) {
      editBtn.innerText = 'Save'
      setIsEditing(true)
    }
    else {
      editBtn.innerText = 'Edit'
      setIsEditing(false)
    }
  }

  const handleDel = () => {
    const button = document.getElementById("post-delete-btn" + post.id)
    if (!isDeleting) {
      button.style.color = 'red'
      button.style.fontWeight = 'bold'
      button.innerText = confirmDeleteBtnText
      setIsDeleting(true)
    }
    else {
      deletePost(setPostResponse, post.id)
      button.style.color = '#3e3e3e'
      button.style.fontWeight = 'normal'
      button.innerText = deleteBtnText
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
      <textarea value={content}/>
      : 
      <p className='post-content'>{post.content}</p>
      }
      {isOwner && <div className="modify-btn-wrap">
        <button 
        id={'post-edit-btn' + post.id}
        onClick={handleEdit}
        className="modify-btn">Edit</button>
        <button 
          id={"post-delete-btn" + post.id} 
          className="modify-btn" 
          onClick={handleDel}
        >{deleteBtnText}
        </button>
      </div>}
    </li>
  );
};

export default PostItem;
