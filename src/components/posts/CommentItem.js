import { Avatar, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import client from '../../utils/client';
import { formatTime } from './utils/getAllPosts';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useEffect, useState } from 'react';
import { createCommentLike, deleteCommentLike } from './utils/likeRequests';
import PostComments from './PostComments';

const CommentItem = ({
  userId,
  post,
  comment,
  setPostResponse,
  margin = 0,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserId = userId();

    for (let i = 0; i < comment.likes.length; i++) {
      if (getUserId === comment.likes[i].userId) {
        return setIsLiked(true);
      }
    }

    setIsLiked(false);
  }, [comment, userId]);

  const handleClick = e => {
    client
      .get(`/user/${comment.userId}`)
      .then(res =>
        navigate('/profile', { state: { user: res.data.data.user } })
      )
      .catch(err => console.error(err.response));
  };

  const handleLike = () => {
    if (isLiked) {
      deleteCommentLike(setPostResponse, post.id, comment.id);
    } else {
      createCommentLike(setPostResponse, post.id, comment.id);
    }
  };

  return (
    <>
      <li
        className="comment-item"
        style={{
          marginLeft: margin,
          borderLeft: '1px solid lightgray',
          paddingLeft: 10,
        }}
      >
        <div className="comment-avatar">
          <Avatar
            src={comment.user.profile.profileImageUrl}
            alt="profile"
            sx={{ width: 35, height: 35 }}
          />
        </div>
        <div className="comment-content-wrap">
          <h4 onClick={handleClick} className="post-owner-name">
            {comment.user.profile.firstName} {comment.user.profile.lastName}
          </h4>
          <p className="createdAt-time">
            &#183; {formatTime(comment.createdAt)}
          </p>
          <p className="comment-content">{comment.content}</p>
        </div>
        <div className="comment-like-wrap">
          <Checkbox
            label="like"
            checked={isLiked}
            icon={<ThumbUpOutlinedIcon />}
            checkedIcon={<ThumbUpIcon />}
            onClick={handleLike}
          />
          <div className="count">{comment.likes.length}</div>
        </div>
      </li>
      {comment?.replies?.length && (
        <PostComments
          comments={comment.replies}
          margin={margin + 20}
          {...{ userId, post, setPostResponse }}
        />
      )}
    </>
  );
};

export default CommentItem;
