// import { Avatar, Checkbox } from '@mui/material';

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
import { deleteComment } from './utils/deleteComment';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import { useLoggedInUser } from '../../context/LoggedInUser';

const delBtn = { color: 'info' };
const confirmDelStyle = { color: 'error' };

const CommentReplyItem = ({
  post,
  comment,
  showingAll,
  setPostResponse,
  isTeacherOrAdmin,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [delStyle, setDelStyle] = useState(delBtn);
  const [confirmDeleteText, setConfirmDeleteText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [thisUserId, setThisUserId] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [editCommentStatus, setEditCommentStatus] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [inactiveWaring, setInactiveWarning] = useState(false);

  const navigate = useNavigate();


  const loggedInUser = useLoggedInUser().user;
  useEffect(() => {
    setThisUserId(loggedInUser.id);

    if (comment.user.isActive === false) {
      setIsActive(false);
    }

    const userHasLiked = comment.likes.find(
      commentLike => commentLike.userId === loggedInUser.id
    );

    if (userHasLiked) {
      return setIsLiked(true);
    }

    setIsLiked(false);

  }, [comment, loggedInUser]);

  const handleClick = e => {
    client
      .get(`/user/${comment.userId}`)
      .then(res => {
        if (comment.user.isActive || isTeacherOrAdmin) {
          navigate('/profile', { state: { user: res.data.data.user } });
        } else {
          setInactiveWarning(true);
          setTimeout(() => {
            setInactiveWarning(false);
          }, 3000);
        }
      })
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

  const inactiveUser = !isActive && loggedInUser.role === 'STUDENT';

  return (
    <li className="comment-list" style={{ marginLeft: '40px' }}>
      <div className="comment-item">
        <div className="comment-avatar" style={{ width: '100%' }}>
          <Avatar
            src={comment.user.profile.profileImageUrl}
            alt="profile"
            sx={{ width: 35, height: 35 }}
          />
          <div className="comment-content-wrap">
            <h4
              onClick={handleClick}
              className={`post-owner-name ${inactiveUser && 'deactive-user'}`}
            >
              <div>
                {comment.user.profile.firstName} {comment.user.profile.lastName}
              </div>
            </h4>
            <p className="createdAt-time">
              {' '}
              &#183; {formatTime(comment.createdAt)}
            </p>
            {!isActive && isTeacherOrAdmin && (
              <div className="deactive-user-teacher-admin">
                <Chip
                  size="small"
                  variant="outlined"
                  color="error"
                  label="deactivated"
                />
              </div>
            )}
            {inactiveWaring && (
              <div className="inactive-warning">
                User account is deactivated!
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
            (isTeacherOrAdmin && (
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

          <div className="comment-like-wrap">
            <Checkbox
              label="like"
              checked={isLiked}
              icon={<ThumbUpOutlinedIcon />}
              checkedIcon={<ThumbUpIcon />}
              onClick={handleLike}
              disabled={inactiveUser}
            />
            <div className="count">{comment.likes.length}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CommentReplyItem;
