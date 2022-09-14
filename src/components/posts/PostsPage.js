import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';

import Header from '../Header/Header';
import { renderPosts } from './utils/getAllPosts';
import PostItem from './PostItem';

const PostsPage = () => {
  const [post, setPost] = useState({ content: '' });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    renderPosts(setPosts);
    // eslint-disable-next-line
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    client
      .post('/post', post)
      .then((res) => setPostResponse(res.data))
      .catch((data) => {
        console.log(data);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    navigate('../', { replace: true });
  };

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <section className='posts-section'>
        <button id='user-signout-button' onClick={signOut}>
          sign out
        </button>
        <p>Status: {postResponse.status}</p>
        <PostForm handleSubmit={createPost} handleChange={handleChange} />
        {posts.length > 0 ?
          <ul className='posts-list'>
            {posts.map((post, index) => <PostItem post={post} key={index} />)}
          </ul>
          :
          <p className='no-posts-message'>There are no posts at the moment.</p>
        }
      </section>
    </>
  );
};

export default PostsPage;
