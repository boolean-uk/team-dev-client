import { Avatar } from '@mui/material'
import React, { useState } from 'react'

const CommentItem = ({ comment }) => {
    const [content, setContent] = useState(comment.content)

    const handleClick = (e) => {
        const ok = 'ok'
    }
  return (
    <li className="post-item">
      <div className="post-wrap">
        <div className="post-header-wrap">
          <div className="post-profile-wrap">
            <Avatar
              src={''}
              alt="profile"
              sx={{ width: 56, height: 56 }}
            />
            <h3 onClick={handleClick} className="post-owner-name">
                Steve Steve
            </h3>
          </div>
          <p className="createdAt-time">{comment.createdAt}</p>
        </div>
          <p className='post-content'>{content}</p>
        </div>
    </li>
  )
}

export default CommentItem