import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';

import Header from '../Header/Header';

const PostsPage = () => {
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

  return (
    <>
      <Header />
      <section className='posts-section'>
        <p>Status: {postResponse.status}</p>
        <PostForm handleSubmit={createPost} handleChange={handleChange} />
        <ul className='posts-list'>
        {posts.map((post, index) => (
          <li key={index} className='post-item'>
            {post.content}
            <div className="comments-section">
              <form>
                <input type='text' className="post__comment" name="comment" label="New Comment" variant="outlined"/>
                <button type="button" className="comment-button" >Comment</button>
              </form>
              <ul className="comments-list">
                <li className="comment-item">"Hello"</li >
              </ul>
            </div>
          </li>
        ))}
      </ul>
        
      </section>
    </>

  );

};

export default PostsPage;
