import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';
import { Box, Stack } from '@mui/material';
import Header from '../Header/Header';
import dateTimetoRelativeTime from './helperfunctions';
import Comment from './PostComment'


const PostsPage = ({role}) => {
  const [post, setPost] = useState({ content: '' });
  const [postResponse, setPostResponse] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentResponse, setcommentResponse] = useState({})
  const [load, setLoad] = useState(true)
  const [comment, setComment] = useState('')

  useEffect(() => {
    client.get('/posts').then((res) => setPosts(res.data.data.posts))
  }, [load])

  const createPost = async (event) => {
    event.preventDefault()
    client
      .post('/post', post)
      .then((res) =>{
        setPostResponse(res.data)
      })
      .catch((data) => {
        console.log(data)
      })
  }
  
  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    setPost({
      ...post,
      [name]: value,
    })
  }

  const createComment = async (event) => {
    event.preventDefault()
    const postId = event.target.firstChild.id
    client
      .post(`/post/${postId}/comment`, comment)
      .then((res) => {
        setcommentResponse(res.data)
        setLoad(x => !x)
      })
      .catch((data) => {
        console.log(data)
      })
  }

  const handleComment = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    setComment({
      ...comment,
      [name]: value,
    })
  }
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
              <Comment post={post} createComment={createComment} handleComment={handleComment} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostsPage
