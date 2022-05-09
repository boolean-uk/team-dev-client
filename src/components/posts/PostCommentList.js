import React from 'react';
import CommentItem from './PostCommentListItem';

function CommentList({ post }) {
  return (
    <ul className='comments-list'>
      {post.postComments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </ul>
  );
}

export default CommentList;
