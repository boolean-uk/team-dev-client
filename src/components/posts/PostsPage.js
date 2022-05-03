import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';
import { Box, Stack } from '@mui/material';
import Header from '../Header/Header';
import dateTimetoRelativeTime from './helperfunctions';

const PostsPage = ({role}) => {
  const [post, setPost] = useState({ content: '' });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get('/posts').then((res) => setPosts(res.data.data.posts));
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    client
      .post('/post', post)
      .then((res) => setPostResponse(res.data))
      .catch((data) => {});
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
      <Header role={role}/>
      <section className='posts-section'>
        <p>Status: {postResponse.status}</p>
        <PostForm handleSubmit={createPost} handleChange={handleChange} />
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
