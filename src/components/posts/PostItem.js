import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  ClickAwayListener,
  Chip,
  AvatarGroup,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import { deletePost } from './utils/deletePost';
import { editPost } from './utils/editPost';
import { useNavigate } from 'react-router-dom';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import GradeIcon from '@mui/icons-material/Grade';
import { createLike, deleteLike } from './utils/likeRequests';
import client from '../../utils/client';
import { LikesView } from './LikesView';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { formatTime } from './utils/getAllPosts';
import VerticalDotMenu from './utils/VerticalDotMenu';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLoggedInUser } from '../../context/LoggedInUser';
import PushPinIcon from '@mui/icons-material/PushPin';

const likesToBeHotTopic = 10;

const PostItem = ({
  post,
  setPostResponse,
  isTeacherOrAdmin,
  setErrorPinPost,
  setErrorPrivatePost,
}) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isPrivate, setIsPrivate] = useState(post.isPrivate);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostContent, setEditPostContent] = useState('');
  const [editError, setEditError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState('');
  const [showingAll, setShowingAll] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inactiveWaring, setInactiveWarning] = useState(false);

  const isActive = post.user.isActive;
  const { user } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOwner(false);
    setIsPrivate(post.isPrivate);
    resetDelBtn();
    resetEditBtn();
    setLikesCount(post.likes.length);

    if (user.id === post.userId) {
      setIsOwner(true);
    }

    post.likes.forEach(like => {
      if (user.id === like.userId) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  }, [post, user.id]);

  const resetDelBtn = () => {
    setIsDeleting(false);
  };

  const resetEditBtn = () => {
    setIsEditing(false);
  };

  const handleEditPost = async () => {
    const res = await editPost(setPostResponse, post.id, editPostContent);
    if (res?.status === 'fail') {
      return setEditError(res.message);
    }
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    if (!isDeleting) {
      setIsDeleting(true);
    } else {
      deletePost(setPostResponse, post.id, post.id);
      setIsDeleting(false);
    }
  };

  const handleClick = (e, id = post.userId) => {
    client
      .get(`/user/${id}`)
      .then(res => {
        if (post.user.isActive || isTeacherOrAdmin) {
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

  const handleLike = e => {
    if (isLiked) {
      deleteLike(setPostResponse, post.id);
      setIsLiked(false);
    } else {
      createLike(setPostResponse, post.id);
      setIsLiked(true);
    }
  };

  let liClasses = 'post-item';
  if (post.isPostOfTheWeek) {
    liClasses += ' post-of-the-week';
  }

  const TryAgain = () => {
    try {
      return editError;
    } finally {
      setTimeout(() => {
        setEditError('');
      }, 3000);
    }
  };

  if (post.isPinnedPost) {
    liClasses += ' pinned-post';
  }

  const inactiveUser = !isActive && user.role === 'STUDENT';

  return (
    <li className={liClasses}>
      {isPrivate && (
        <div
          onClick={() => setIsPrivate(false)}
          className="post-hidden-overlay"
        >
          <VisibilityOffIcon fontSize="large" color="disabled" />
        </div>
      )}
      <div className="post-wrap">
        <div className="post-header-wrap">
          <div className="post-profile-wrap">
            <Avatar
              src={post.user.profile.profileImageUrl}
              alt="profile"
              sx={{ width: 56, height: 56 }}
            />

            <h3
              onClick={handleClick}
              className={`post-owner-name ${inactiveUser && 'deactive-user'}`}
            >
              <div>
                {post.user.profile.firstName} {post.user.profile.lastName}
              </div>
            </h3>
            {!isActive && isTeacherOrAdmin && (
              <div className="deactive-user-teacher-admin">
                <Chip variant="outlined" color="error" label="deactivated" />
              </div>
            )}
            {inactiveWaring && (
              <div className="inactive-warning">
                <p>User account is deactivated!</p>
              </div>
            )}
          </div>
          <div>
            {post.isPostOfTheWeek ? (
              <Chip
                size="medium"
                color="warning"
                icon={<GradeIcon size="medium" />}
                label={'Post of the Week'}
                variant="outlined"
              />
            ) : post.likes.length >= likesToBeHotTopic ? (
              <Chip
                size="small"
                color="error"
                icon={<LocalFireDepartmentOutlinedIcon />}
                label="Hot Topic"
                variant="outlined"
              />
            ) : (
              <div className="hot-topic-placeholder"></div>
            )}

            {post.isPinnedPost && (
              <Chip
                size="medium"
                color="warning"
                icon={<PushPinIcon size="medium" />}
                label={'Pinned Post'}
                variant="outlined"
              />
            )}

            {isOwner && (
              <VerticalDotMenu
                post={post}
                setPostResponse={setPostResponse}
                setErrorPinPost={setErrorPinPost}
                setErrorPrivatePost={setErrorPrivatePost}
              />
            )}
            <p className="createdAt-time">{formatTime(post.createdAt)}</p>
          </div>
        </div>
        {editError && (
          <div style={{ textAlign: 'left', color: 'red' }}>
            <TryAgain />
          </div>
        )}
        {isEditing ? (
          <>
            <div className="edit-content-wrap">
              <TextField
                fullWidth
                defaultValue={post.content}
                variant="outlined"
                size="small"
                multiline
                inputProps={{ maxLength: 150 }}
                onChange={e => setEditPostContent(e.target.value)}
              ></TextField>
              <Button
                className="submit-edited-comment"
                onClick={handleEditPost}
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
          <p className="post-content">{post.content}</p>
        )}

        <div className="comment-nav-wrap">
          {isOwner && (
            <div className="edit-button-form-wrap">
              {!isEditing && (
                <Button
                  className="edit-button-icon"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon />
                </Button>
              )}
            </div>
          )}
          {(isOwner || isTeacherOrAdmin) && (
            <div className="delete-button">
              <ClickAwayListener onClickAway={resetDelBtn}>
                <Button
                  className="delete-button-icon"
                  color={`${isDeleting ? 'error' : 'info'}`}
                  onClick={handleDeletePost}
                >
                  <DeleteIcon />
                </Button>
              </ClickAwayListener>
              {isDeleting && (
                <Button variant="text" color="error" onClick={handleDeletePost}>
                  confirm delete?
                </Button>
              )}
            </div>
          )}

          <div className="like-wrap">
            <LikesView
              post={post}
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
              handleClick={handleClick}
            />
            <AvatarGroup onClick={() => setOpenDialog(true)}>
              {post.likes.map(like => {
                return (
                  <Avatar
                    key={like.postId + like.userId}
                    total={post.likes.length}
                    alt={like.user.profile.firstName}
                    src={like.user.profile.profileImageUrl}
                  />
                );
              })}
            </AvatarGroup>
            <div style={{ cursor: inactiveUser && 'not-allowed' }}>
              <Checkbox
                label="like"
                checked={isLiked}
                icon={<ThumbUpOutlinedIcon />}
                checkedIcon={<ThumbUpIcon />}
                onChange={handleLike}
                disabled={inactiveUser}
              />
            </div>
            <div className="count">{likesCount}</div>
          </div>
        </div>
      </div>

      <div className="comment-wrap">
        <CommentForm setPostResponse={setPostResponse} post={post} />
        <Comments
          post={post}
          showingAll={showingAll}
          setShowingAll={setShowingAll}
          setPostResponse={setPostResponse}
          isTeacherOrAdmin={isTeacherOrAdmin}
        />
      </div>
    </li>
  );
};

export default PostItem;
