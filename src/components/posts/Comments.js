import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import FilterMenu from './utils/filterMenu';

const Comments = ({
  post,
  showingAll,
  setShowingAll,
  setPostResponse,
  isTeacherorAdmin,
}) => {
  const [sortType, setSortType] = useState('Most Liked');
  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    const postCommentsOnly = post.comments.filter(comment => !comment.parentId);

    setComments(postCommentsOnly);

    if (sortType === 'Most Recent') {
      setComments(prev =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
    if (sortType === 'Oldest') {
      setComments(prev =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    }
    if (sortType === 'Most Liked') {
      setComments(prev =>
        [...prev].sort((a, b) => b.likes.length - a.likes.length)
      );
    }
  }, [sortType, post]);

  const handleShowAll = () => setShowingAll(!showingAll);

  return (
    <div className="comments-section">
      {showingAll && (
        <div className="comment-filter">
          <FilterMenu setSortType={setSortType} />
        </div>
      )}
      <ul className="comments-list">
        {!showingAll
          ? comments.length >= 1 && (
              <CommentItem
                post={post}
                comment={comments[0]}
                showingAll={showingAll}
                setPostResponse={setPostResponse}
                isTeacherorAdmin={isTeacherorAdmin}
              />
            )
          : comments.length > 0 &&
            comments.map((comment, index) => (
              <CommentItem
                showingAll={showingAll}
                post={post}
                comment={comment}
                key={comment.id}
                setPostResponse={setPostResponse}
                isTeacherorAdmin={isTeacherorAdmin}
              />
            ))}
      </ul>
      {comments.length > 1 && (
        <p className="comments-show-all" onClick={handleShowAll}>
          {!showingAll
            ? `Show All Comments (${comments.length})`
            : 'Hide Comments'}
        </p>
      )}
    </div>
  );
};

export default Comments;
