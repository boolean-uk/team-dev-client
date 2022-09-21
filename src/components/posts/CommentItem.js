import { Avatar } from '@mui/material'

const CommentItem = ({ comment }) => {

    const handleClick = (e) => {
        const ok = 'ok'
    }

  return (
    <li className="post-item">
      <div className="post-wrap">
        <div className="post-header-wrap">
          <div className="post-profile-wrap">
            <Avatar
              src={comment.user.profile.profileImageUrl}
              alt="profile"
              sx={{ width: 56, height: 56 }}
            />
            <h3 onClick={handleClick} className="post-owner-name">
                {comment.user.profile.firstName} {comment.user.profile.lastName}
            </h3>
          </div>
          <p className="createdAt-time">{comment.formattedCreatedAt}</p>
        </div>
          <p className='post-content'>{comment.content}</p>
        </div>
    </li>
  )
}

export default CommentItem