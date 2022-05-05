import React from 'react'
import { useState, useEffect } from 'react'



const [comment, setComment] = useState('')
const [showAllArr, setShowAll] = useState([])
const [post, setPost] = useState({ content: '' })
function PostComments({createComment, handleComment, removeFromShowedComments, addToShowedComments }) {
  return (
    <div className="comments-section">
      <form onSubmit={(event) => createComment(event, post.id)}>
        <input
          id={post.id}
          type="text"
          className="post__comment"
          onChange={handleComment}
          name="comment"
          label="New Comment"
          variant="outlined"
          value={comment}
        />
        <button className="comment-button">Comment</button>
      </form>
      <div className="single-comment">
        {post.postComments &&
          post.postComments.length > 1 &&
          !showAllArr.includes(post.id) && (
            <div onClick={() => addToShowedComments(post.id)}>
              show all
              <span className="commentCount">
                {` (${post.postComments.length})`}
              </span>
            </div>
          )}
        {showAllArr.includes(post.id) && (
          <div onClick={() => removeFromShowedComments(post.id)}>hide</div>
        )}
        {post.postComments &&
        post.postComments.length !== 0 &&
        !showAllArr.includes(post.id)
          ? post.postComments[0].content
          : ''}
        <ul className="comments-list">
          {showAllArr.includes(post.id) &&
            post.postComments.map((comment) => (
              <li key={comment.id} className="comment-item">
                {comment.content}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default PostComments
