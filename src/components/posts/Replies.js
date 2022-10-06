import React, { useEffect, useState } from 'react';
import CommentReplyItem from './CommentReplyItem';
import FilterMenu from './utils/filterMenu';

const Replies = ({ post, comment, setPostResponse, isTeacherorAdmin }) => {
  const [sortType, setSortType] = useState('Most Liked');
  const [comments, setComments] = useState(comment.replies);
  const [showingAll, setShowingAll] = useState(false);

  useEffect(() => {
    if (sortType === 'Most Recent') {
      setComments(
        [...comment.replies].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    }
    if (sortType === 'Oldest') {
      setComments(
        [...comment.replies].sort((a, b) => {
          return new Date(a.createdAt) - new Date(b.createdAt);
        })
      );
    }
    if (sortType === 'Most Liked') {
      setComments(
        [...comment.replies].sort((a, b) => {
          return b.likes.length - a.likes.length;
        })
      );
    }
  }, [sortType, comment]);

  const handleShowAll = () => {
    setShowingAll(!showingAll);
  };

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
              <CommentReplyItem
                post={post}
                comment={comments[0]}
                showingAll={showingAll}
                setPostResponse={setPostResponse}
                isTeacherorAdmin={isTeacherorAdmin}
              />
            )
          : comments.length > 0 &&
            comments.map(comment => (
              <CommentReplyItem
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
            ? `Show All Replies (${comments.length})`
            : 'Hide Replies'}
        </p>
      )}
    </div>
  );
};

export default Replies;
