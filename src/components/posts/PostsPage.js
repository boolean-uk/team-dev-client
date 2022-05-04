import React from 'react';
import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';
import { Box, Stack } from '@mui/material';
import Header from '../Header/Header';
import dateTimetoRelativeTime from './helperfunctions';
import { Link } from 'react-router-dom';

const PostsPage = ({ role }) => {
  const [post, setPost] = useState({ content: '' });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('')
  const [load, setLoad] = useState(true)
  useEffect(() => {
    client.get('/posts').then((res) => setPosts(res.data.data.posts))
  }, [load])
  const createPost = async (event) => {
    event.preventDefault()
    client
      .post('/post', { content: post })
      .then((res) => {
        setPostResponse(res.data);
        setPosts((posts) => [res.data.data.post, ...posts]);
      })
      .catch((data) => {});
    setPost(() => ({ content: '' }));
  };

  const handleChange = (event) => {
    event.preventDefault()
    const { value } = event.target
    setPost(value)
  }




  const createComment = async (event, postId) => {
    event.preventDefault()
    client
      .post(`/post/${postId}/comment`, { content: comment })
      .then(() => {
        setLoad((x) => !x)
        setComment('')
      })
      .catch((data) => {
        console.log(data)
      })
  }
console.log(posts)
  const handleComment = (event) => {
    event.preventDefault()
    const { value } = event.target
    setComment(value)
  }
  return (
    <>
      <Header role={role} />
      <section className='posts-section'>
        {postResponse.status}
        <PostForm handleSubmit={createPost} handleChange={handleChange} inputValue={post.content} />
        <ul className="posts-list">
          {posts.map((post, index) => (
            <li key={index} className='post-item'>
              <Box>
                <div className="post-content">{post.content}</div>
                <Stack className="names-date" spacing={2} direction="row">
                  <Link to={`/user/${post.user.id}`} className='post-author'>
                    <Box className="fullname" variant='contained'>
                      <strong>{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</strong>
                    </Box>
                  </Link>
                  <Box className="date-time" variant="contained">
                    {dateTimetoRelativeTime(post.createdAt)}
                  </Box>
                </Stack>
              </Box>
              <div className='comments-section'>
                <form onSubmit={event => createComment(event, post.id)}>
                  <input
                    id={post.id}
                    type='text'
                    className='post__comment'
                    onChange={handleComment}
                    name='comment'
                    label='New Comment'
                    variant='outlined'
                    value={comment}
                  />
                  <button className='comment-button'>Comment</button>
                </form>
                <ul className='comments-list'>
                  {post.postComments.map((comment) => (
                    <li key={comment.id} className='comment-item'>
                  {comment.content}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostsPage
