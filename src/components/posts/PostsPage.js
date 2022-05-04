import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';
import { Box, Stack } from "@mui/material";
import Header from "../Header/Header";
import dateTimetoRelativeTime from "./helperfunctions";
import CohortList from "../cohort/CohortList";

const PostsPage = () => {
  const [post, setPost] = useState({ content: "" });
  const [postResponse, setPostResponse] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get("/posts").then((res) => setPosts(res.data.data.posts));
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    client
      .post("/post", post)
      .then((res) => {
        setPostResponse(res.data);
        setPosts((posts) => [res.data.data.post, ...posts]);
      })
      .catch((data) => {});
    setPost(() => ({ content: "" }));
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
      {/* <Header />
      <div className="home-container">
        <section className="posts-section">
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

        <CohortList />
      </div> */}
      <Header />
      <div className="home-container">
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
            </li>
          ))}
        </ul>
      </section>
      <CohortList />
      </div>
    </>
  );
};

export default PostsPage;
