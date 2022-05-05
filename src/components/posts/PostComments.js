import React from "react";
import { useState} from "react";
import client from '../../utils/client'
import dateTimetoRelativeTime from './helperfunctions'
import { Box, Stack } from '@mui/material'


function PostComments({onCommentAdded, post}) {
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const createComment = (event, postId) => {
    event.preventDefault();
    client
      .post(`/post/${postId}/comment`, { content:comment })
      .then((res) => {
        setComment("");
        onCommentAdded(post, res.data.data.comment);
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const toggleCommentsList = () => {
    setShowAll((toggle) => !toggle);
  };

  const handleComment = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setComment(value);
  };

  return (
    <div className="comments-section">
      { post.id &&
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
      </form> }
      <div className="single-comment">
        {post.postComments && post.postComments.length > 1 && !showAll && (
          <div onClick={() => toggleCommentsList()}>
            show all
            <span className="commentCount">
              {` (${post.postComments.length})`}
            </span>
          </div>
        )}
        {showAll && <div onClick={() => toggleCommentsList()}>hide</div>}
        {post.postComments && post.postComments.length !== 0 && !showAll
          ? post.postComments[0].content
          : ""}
        <ul className="comments-list">
          {showAll &&
            post.postComments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <Box>
                  <div className="comment-content">{comment.content}</div>
                  <Stack className="names-date" spacing={2} direction="row">
                    {/* <Box className='fullname' variant='contained'>
                                <strong>{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</strong>
                              </Box> */}
                    <Box className="date-time" variant="contained">
                      {dateTimetoRelativeTime(comment.createdAt)}
                    </Box>
                  </Stack>
                </Box>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default PostComments;
