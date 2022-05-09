import React from 'react';

function ShowAll({ toggleCommentsList, post }) {
  return (
    <div onClick={() => toggleCommentsList()}>
      show all
      <span className='commentCount'>{` (${post.postComments.length})`}</span>
    </div>
  );
}

export default ShowAll;
