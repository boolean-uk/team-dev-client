import React from 'react';
import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import Post from './Post';
import client from '../../utils/client';
import './style.css';
import CohortList from '../cohort/CohortList';

const PostsPage = ({ role, userId }) => {
  const [post, setPost] = useState({ content: '' });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client.get('/posts').then((res) => {
      setPosts(res.data.data.posts);
    });
  }, [postResponse]);

  const createPost = (event) => {
    event.preventDefault();
    client
      .post('/post', post)
      .then((res) => {
        setPostResponse(res.data);
        setPosts((posts) => [res.data.data.post, ...posts]);
      })
      .catch((err) => {
        console.log(err.message, 'Invalid Post');
      });
    setPost(() => ({ content: '' }));
  };

  const onCommentAdded = (post, comment) => {
    setPosts(
      posts.map((updatedPost) =>
        updatedPost === post
          ? { ...post, postComments: [comment, ...post.postComments] }
          : updatedPost
      )
    );
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
      <div className='home-container'>
        <section className='posts-section'>
          <div>
            {postResponse.status}
            <PostForm
              handleSubmit={createPost}
              handleChange={handleChange}
              inputValue={post.content}
            />
            <ul className='posts-list'>
              {posts.map((post, index) => (
                <li key={index} className='post-item'>
                  <Post post={post} onCommentAdded={onCommentAdded} userId={userId} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        {role === 'TEACHER' && <CohortList />}
      </div>
    </>
  );
};


export default PostsPage;
