import {
  Avatar,
  Button,
  Checkbox,
  TextField,
  ClickAwayListener,
  Chip,
  AvatarGroup,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
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

const deleteBtnText = 'Delete';
const confirmDeleteBtnText = 'Confirm Delete?';
const delBtnStyle = { text: deleteBtnText, color: 'primary' };
const confirmDelStyle = { text: confirmDeleteBtnText, color: 'error' };
const editBtnStyle = { text: 'Edit', color: 'primary' };
const confirmEditStyle = { text: 'Save', color: 'success' };
const likesToBeHotTopic = 10;

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
});

const PostItem = ({
  post,
  userId,
  setPostResponse,
  setUser,
  isTeacherorAdmin,
}) => {
  const [isOwner, setIsOwner] = useState(false);
  const [content, setContent] = useState(post.content);
  const [newContent, setNewContent] = useState(post.content);
  const [isPrivate, setIsPrivate] = useState(post.isPrivate);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editStyle, setEditStyle] = useState(editBtnStyle);
  const [delStyle, setDelStyle] = useState(delBtnStyle);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState('');
  const [showingAll, setShowingAll] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [test, setIsTest] = useState(true);

  const [isDeactive, setIsDeactive] = useState(false);

  const navigate = useNavigate();
  const getUserId = userId();

  useEffect(() => {
    setIsOwner(false);
    setIsPrivate(post.isPrivate);
    resetDelBtn();
    resetEditBtn();
    setContent(post.content);
    setNewContent(post.content);
    setLikesCount(post.likes.length);
    if (getUserId === post.userId) {
      setIsOwner(true);
    }
    post.likes.forEach(like => {
      if (getUserId === like.userId) {
        setIsLiked(true);
      }
    });
    // eslint-disable-next-line
  }, [post, userId]);

  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setNewContent(value);
  };

  const resetDelBtn = () => {
    setDelStyle(delBtnStyle);
    setIsDeleting(false);
  };

  const resetEditBtn = () => {
    setEditStyle(editBtnStyle);
    setIsEditing(false);
  };

  const handleEdit = e => {
    if (!isEditing) {
      setEditStyle(confirmEditStyle);
      setIsEditing(true);
    } else {
      editPost(setPostResponse, post.id, newContent);
      resetDelBtn();
    }
  };

  const handleEditClickAway = () => {
    if (newContent === content) {
      resetEditBtn();
    }
  };

  const handleDel = () => {
    if (!isDeleting) {
      setDelStyle(confirmDelStyle);
      setIsDeleting(true);
    } else {
      deletePost(setPostResponse, post.id);
      setIsDeleting(false);
      setShowingAll(false);
    }
  };

  const handleGroupAvatars = e => {
    if (e.target.outerText.includes('+')) {
      setOpenDialog(true);
    }
  };

  const handleClick = (e, id = post.userId) => {
    client
      .get(`/user/${id}`)
      .then(res => {
        navigate('/profile', { state: { user: res.data.data.user } });
      })
      .catch(err => console.error(err.response));
  };

  const handleLike = e => {
    setIsLiked(e.target.checked);
    if (!isLiked) {
      createLike(setPostResponse, post.id);
    } else {
      deleteLike(setPostResponse, post.id);
    }
  };

  const deactivatedUser = () => {
    if (test) {
      setIsActive(false);
      setIsDeactive(true);
    } else {
      setIsDeactive(false);
      setIsActive(true);
    }
  };

  let liClasses = 'post-item';
  if (post.isPostOfTheWeek) {
    liClasses += ' post-of-the-week';
  }

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
            {/* <h3
              // onMouseEnter={deactivatedUser}
              onClick={handleClick}
              // className={`post-owner-name ${isDeactive ? 'deactive-user' : ''}`}
            > */}
            {post.user.profile.firstName} {post.user.profile.lastName}
            <h3 onClick={handleClick} className="post-owner-name">
              {isActive ? (
                <div>
                  {post.user.profile.firstName} {post.user.profile.lastName}
                </div>
              ) : (
                `[removed]`
              )}
            </h3>
          </div>
          <div>
            {post.isPostOfTheWeek ? (
              <Chip
                size="medium"
                color="warning"
                icon={<GradeIcon size="medium" />}
                label={'Post of the Week'}
                variant="outlined"
                theme={theme}
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
            {isOwner && (
              <VerticalDotMenu post={post} setPostResponse={setPostResponse} />
            )}
            <p className="createdAt-time">{formatTime(post.createdAt)}</p>
          </div>
        </div>

        {isEditing ? (
          <ClickAwayListener onClickAway={handleEditClickAway}>
            <TextField multiline value={newContent} onChange={handleChange} />
          </ClickAwayListener>
        ) : (
          <p className="post-content">{post.content}</p>
        )}
        <div className="btn-likes-wrap">
          <div className="modify-btn-wrap">
            {isOwner ? (
              <Button
                color={editStyle.color}
                variant="text"
                id={'post-edit-btn' + post.id}
                onClick={handleEdit}
                className="modify-btn"
              >
                {editStyle.text}
              </Button>
            ) : (
              <div></div>
            )}
            {isOwner || isTeacherorAdmin ? (
              <ClickAwayListener onClickAway={resetDelBtn}>
                <Button
                  variant="text"
                  color={delStyle.color}
                  className="modify-btn"
                  onClick={handleDel}
                >
                  {delStyle.text}
                </Button>
              </ClickAwayListener>
            ) : (
              <div></div>
            )}
          </div>
          <div className="like-wrap">
            <LikesView
              post={post}
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
              handleClick={handleClick}
            />
            <AvatarGroup onClick={e => handleGroupAvatars(e)} max={6}>
              {post.likes.map((like, i) => {
                return (
                  <Avatar
                    key={i}
                    sx={{ cursor: 'pointer' }}
                    total={post.likes.length}
                    onClick={e => handleClick(e, like.user.id)}
                    size="small"
                    alt={like.user.profile.firstName}
                    src={like.user.profile.profileImageUrl}
                  />
                );
              })}
            </AvatarGroup>
            <Checkbox
              label="like"
              checked={isLiked}
              icon={<ThumbUpOutlinedIcon />}
              checkedIcon={<ThumbUpIcon />}
              onChange={handleLike}
            />
            <div className="count">{likesCount}</div>
          </div>
        </div>
      </div>

      <div className="comment-wrap">
        <CommentForm setPostResponse={setPostResponse} post={post} />
        <Comments
          userId={userId}
          setUser={setUser}
          post={post}
          showingAll={showingAll}
          setShowingAll={setShowingAll}
          setPostResponse={setPostResponse}
          isTeacherorAdmin={isTeacherorAdmin}
        />
      </div>
    </li>
  );
};

export default PostItem;
