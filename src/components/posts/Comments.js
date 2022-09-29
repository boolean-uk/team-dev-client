import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import PostComments from './PostComments';
import FilterMenu from './utils/filterMenu';

const formatData = comments => {
  const map = new Map();
  const commentsWithReplies = [];

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    comment.replies = [];

    map.set(comment.id, i);

    if (comment.parentId) {
      const parentIndex = map.get(comment.parentId);
      comments[parentIndex].replies.push(comment);

      continue;
    }

    commentsWithReplies.push(comment);
  }

  return commentsWithReplies;
};

const Comments = ({
  userId,
  post,
  setUser,
  showingAll,
  setShowingAll,
  setPostResponse,
}) => {
  const [sortType, setSortType] = useState('Most Recent');
  const [comments, setComments] = useState(post.comments);
  console.log(comments);
  useEffect(() => {
    const formattedData = formatData(post.comments);
    setComments(formattedData);

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
                userId={userId}
                post={post}
                comment={comments[0]}
                setPostResponse={setPostResponse}
              />
            )
          : comments.length > 0 && (
              <PostComments
                userId={userId}
                post={post}
                comments={comments}
                setPostResponse={setPostResponse}
              />
            )}
      </ul>
      {comments.length > 1 && (
        <p className="comments-show-all" onClick={handleShowAll}>
          {!showingAll
            ? `Show All Comments (${post.comments.length})`
            : 'Hide Comments'}
        </p>
      )}
    </div>
  );
};

export default Comments;
