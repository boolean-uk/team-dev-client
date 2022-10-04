import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  ClickAwayListener,
  Chip,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import client from '../../utils/client';
import { formatTime } from './utils/getAllPosts';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useEffect, useState } from 'react';
import { createCommentLike, deleteCommentLike } from './utils/likeRequests';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import { deleteComment } from './utils/deleteComment';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import CommentReplyForm from './CommentReplyForm';
import Replies from './Replies';
import { useLoggedInUser } from '../../context/LoggedInUser';

const delBtn = { color: 'info' };
const confirmDelStyle = { color: 'error' };

const CommentItem = ({
  userId,
  post,
  comment,
  setUser,
  setPostResponse,
  isTeacherorAdmin,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [delStyle, setDelStyle] = useState(delBtn);
  const [confirmDeleteText, setConfirmDeleteText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [thisUserId, setThisUserId] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [editCommentStatus, setEditCommentStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const { user } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserId = userId();

    setThisUserId(getUserId);

    if (comment.user.isActive === false) {
      setIsActive(false);
    }

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

  const resetDelBtn = () => {
    setDelStyle(delBtn);
    setIsDeleting(false);
    setConfirmDeleteText(false);
  };
  const editcomment = () => {
    setIsEditing(true);
  };

  const createNewComment = e => {
    setEditCommentStatus('');
    setNewComment(e.target.value);
  };

  const submitNewComment = () => {
    if (!newComment) {
      setEditCommentStatus('Missing content!');
      setIsEditing(false);
    } else {
      client
        .patch(`/post/${post.id}/comment/${comment.id}`, {
          content: newComment,
        })
        .then(res => {
          setPostResponse(res.data);
        })
        .catch(e => {
          setEditCommentStatus('error, try again please!');
          setIsEditing(false);
        });
    }

    setIsEditing(false);
  };

  const TryAgain = () => {
    try {
      return editCommentStatus;
    } finally {
      setTimeout(() => {
        setEditCommentStatus(false);
      }, 3000);
    }
  };

  const handleDeleteComment = () => {
    if (!isDeleting) {
      setDelStyle(confirmDelStyle);
      setIsDeleting(true);
      setConfirmDeleteText(true);
    } else {
      deleteComment(setPostResponse, post.id, comment.id);
      setIsDeleting(false);
    }
  };

  const displayCommentReplyForm = () => {
    setShowForm(!showForm);
  };

  return (
    <li className="comment-list">
      <div className="comment-item">
        <div className="comment-avatar">
          <Avatar
            src={comment.user.profile.profileImageUrl}
            alt="profile"
            sx={{ width: 35, height: 35 }}
          />
          <div className="comment-content-wrap">
            <h4
              onClick={handleClick}
              className={`post-owner-name ${
                !isActive && user.role === 'STUDENT' && 'deactive-user'
              }`}
            >
              <div>
                {comment.user.profile.firstName} {comment.user.profile.lastName}
              </div>
            </h4>
            <p className="createdAt-time">
              {' '}
              &#183; {formatTime(comment.createdAt)}
            </p>
            {!isActive && isTeacherorAdmin && (
              <div className="deactive-user-teacher-admin">
                <Chip
                  size="small"
                  variant="outlined"
                  color="error"
                  label="deactivated"
                />
              </div>
            )}
            {editCommentStatus.length > 0 && (
              <div className="try-again">
                <TryAgain />
              </div>
            )}
            {isEditing ? (
              <>
                <div className="edit-content-wrap">
                  <TextField
                    fullWidth
                    defaultValue={comment.content}
                    variant="outlined"
                    size="small"
                    multiline
                    inputProps={{ maxLength: 150 }}
                    onChange={createNewComment}
                  ></TextField>
                  <Button
                    className="submit-edited-comment"
                    onClick={submitNewComment}
                  >
                    <ArrowUpwardIcon />
                  </Button>
                  <Button
                    className="cancel-edit"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    <ClearIcon />
                  </Button>
                </div>
              </>
            ) : (
              <p className="comment-content">{comment.content}</p>
            )}
          </div>
        </div>
        <div className="comment-nav-wrap">
          {thisUserId === comment.userId && (
            <div className="edit-button-form-wrap">
              {!isEditing && (
                <Button className="edit-button-icon" onClick={editcomment}>
                  <EditIcon />
                </Button>
              )}
            </div>
          )}
          {thisUserId === comment.userId ||
            (isTeacherorAdmin && (
              <div className="delete-button">
                <ClickAwayListener onClickAway={resetDelBtn}>
                  <Button
                    className="delete-button-icon"
                    color={delStyle.color}
                    onClick={handleDeleteComment}
                  >
                    <DeleteIcon />
                  </Button>
                </ClickAwayListener>
                {confirmDeleteText && (
                  <Button
                    variant="text"
                    color="error"
                    onClick={handleDeleteComment}
                  >
                    confirm delete?
                  </Button>
                )}
              </div>
            ))}

          <div className="reply-button">
            <Button
              className="reply-button-icon"
              onClick={displayCommentReplyForm}
            >
              <CommentIcon />
            </Button>
          </div>
          <div className="comment-like-wrap">
            <Checkbox
              label="like"
              checked={isLiked}
              icon={<ThumbUpOutlinedIcon />}
              checkedIcon={<ThumbUpIcon />}
              onClick={handleLike}
              className={
                !isActive && user.role === 'STUDENT' && 'deactive-user'
              }
            />
            <div className="count">{comment.likes.length}</div>
          </div>
        </div>
      </div>

      <div>
        {showForm ? (
          <CommentReplyForm
            setPostResponse={setPostResponse}
            post={post}
            comment={comment}
            showForm={showForm}
            setShowForm={setShowForm}
            isActive={isActive}
          />
        ) : null}

        <Replies
          post={post}
          setPostResponse={setPostResponse}
          comment={comment}
          userId={userId}
          isTeacherorAdmin={isTeacherorAdmin}
          isActive={isActive}
        />
      </div>
    </li>
  );
};

export default CommentItem;
