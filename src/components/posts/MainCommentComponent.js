import React from 'react'
import { useState } from 'react'
import CommentForm from './PostCommentListItemForm'
import PreviewComment from './PreviewComment'
import CommentList from './PostCommentList'
import ShowAll from './ShowAllToggle'
function PostComments({ onCommentAdded, post }) {
  const [showAll, setShowAll] = useState(false)

  const toggleCommentsList = () => {
    setShowAll((toggle) => !toggle)
  }

  return (
    <div className='comments-section'>
      {post.id && <CommentForm post={post} onCommentAdded={onCommentAdded} />}
      <div className='first-comment'>
        {post.postComments && post.postComments.length > 1 && !showAll && (
          <ShowAll post={post} toggleCommentsList={toggleCommentsList} />
        )}
        {showAll && <div onClick={() => toggleCommentsList()}>hide</div>}
        {post.postComments && post.postComments.length !== 0 && !showAll ? (
          <PreviewComment post={post} />
        ) : (
          ''
        )}
        {showAll && <CommentList post={post} />}
      </div>
    </div>
  )
}

export default PostComments
