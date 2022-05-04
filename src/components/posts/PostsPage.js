import React from 'react';
import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';
import { Box, Stack } from '@mui/material';
import Header from '../Header/Header';
import dateTimetoRelativeTime from './helperfunctions';
const jwt = require('jsonwebtoken');

const PostsPage = ({role}) => {
  const [post, setPost] = useState({ content: '' });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    client.get('/posts').then((res) => setPosts(res.data.data.posts));
    const payload = jwt.decode(localStorage.getItem(process.env.REACT_APP_USER_TOKEN))
    setUserId(payload.userId)
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    client
      .post('/post', post)
      .then((res) => {
        setPostResponse(res.data)
        setPosts(posts => [res.data.data.post, ...posts])
      })
      .catch((data) => {});
      setPost(() => ({ content: '' }))
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  return (
    <>
      <Header role={role} userId={userId}/>
      <section className='posts-section'>
        <p>Status: {postResponse.status}</p>
        <PostForm handleSubmit={createPost} handleChange={handleChange} inputValue={post.content} />
        <ul className="posts-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              <Box>
                <div className="post-content">{post.content}</div>
                <Stack spacing={2} direction="row">
                  <Box variant="contained">{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</Box>
                  <Box variant="contained">
                    {dateTimetoRelativeTime(post.createdAt)}
                  </Box>
                </Stack>
              </Box>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default PostsPage;
