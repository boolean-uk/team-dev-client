import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext, useState } from 'react';
import client from '../../utils/client';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Post({ post, setPosts, posts, count, setCount }) {
  const heartIcon = <FontAwesomeIcon icon={faHeart} />;
  const { loggedInUser } = useContext(loggedInUserContext);
  const checkIfEditing = (post) => {
    return isEditing.editing && post.id === isEditing.postId;
  };
  const acceptedRoles = ['TEACHER'];
  const isPostDeletableByUser = (post) => {
    return (
      acceptedRoles.includes(loggedInUser.role) ||
      loggedInUser.id === post.user.id
    );
  };
  const [postEdit, setPostEdit] = useState({ content: '' });
  const [isEditing, setIsEditing] = useState({ editing: false, postId: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePostHandler = (event, postId) => {
    event.preventDefault();
    if (isDeleting) {
      client
        .delete(`/post/posts/${postId}`)
        .then((res) => {
          if (posts.length === 1) {
            setPosts([]);
          } else {
            setCount(count + 1);
          }
          setIsDeleting(false);
        })
        .catch((err) => console.error(err.response));
    } else {
      setIsDeleting(true);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setPostEdit({
      [name]: value,
    });
  };
  const handlePostEdit = async (event, postId, content) => {
    event.preventDefault();
    if (event.target.innerText === 'Save') {
      await client.patch(`/post/${postId}`, postEdit);
      const res2 = await client.get('/posts');
      setPosts(res2.data.data.posts);
      setIsEditing({ editing: false, postId: postId });
      setPostEdit({ content: '' });
      return;
    }
    if (isEditing.editing === false) {
      setIsEditing({ editing: true, postId: postId });
      setPostEdit({ content });
    } else {
      setIsEditing({ editing: false, postId: postId });
    }
  };

  const handleLike = async () => {
    const foundLike = post.postLikes.find(
      (like) => like.userId === loggedInUser.id
    );
    const likeData = {
      active: foundLike?.active,
      postLikeId: foundLike?.id,
      userId: foundLike?.userId || loggedInUser.id,
    };

    const res = await client.patch(`/posts/${post.id}/postLike`, likeData);

    const likeRes = res.data.data;

    if (!foundLike) {
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.id === likeRes.postId) {
            return { ...post, postLikes: [...post.postLikes, likeRes] };
          } else return post;
        });
      });
    } else {
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.id === likeRes.postId) {
            const newLikes = post.postLikes.map((like) =>
              like.id === likeRes.id ? likeRes : like
            );
            return { ...post, postLikes: [...newLikes] };
          } else return post;
        });
      });
    }
  };

  function countLikes(likes) {
    return likes.filter((like) => like.active).length;
  }

  function applyClasses() {
    return checkIfEditing(post)
      ? 'editing post-item'
      : `post-item ${countLikes(post.postLikes) > 9 ? 'top-likes' : ''}`;
  }

  return (
    <li className={applyClasses()}>
      <img
        src={post.user.profile.profileUrl}
        alt='user-avatar'
        className='post-user-image'
      />
      {(checkIfEditing(post) && (
        <textarea
          name='content'
          defaultValue={post.content}
          onChange={(e) => handleChange(e)}
          size={30}
        ></textarea>
      )) ||
        post.content}
      <div className='button-container'>
        {isPostDeletableByUser(post) && (
          <Button
            className='delete-btn'
            size='small'
            variant='contained'
            color={isDeleting ? 'error' : 'primary'}
            onClick={(event) => deletePostHandler(event, post.id)}
          >
            {isDeleting ? 'Confirm' : 'Delete'}
          </Button>
        )}
        {loggedInUser.id === post.user.id && (
          <button
            className='post_edit_button'
            onClick={(e) => handlePostEdit(e, post.id, post.content)}
          >
            {checkIfEditing(post) ? 'Save' : 'Edit Post'}
          </button>
        )}
      </div>
      {<p className='edited'>{post.edited ? 'Edited' : ''}</p>}

      <div className='heart' onClick={handleLike}>
        {heartIcon} {countLikes(post.postLikes)}
      </div>
    </li>
  );
}
