import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import { Box, Stack } from '@mui/material'
import Header from '../Header/Header'
import dateTimetoRelativeTime from './helperfunctions'

const PostsPage = ({ role }) => {
  const [post, setPost] = useState('')
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
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
        setPostResponse(res.data)
        setLoad((x) => !x)
        setPost('')
      })
      .catch((data) => {
        console.log(data)
      })
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value } = event.target
    setPost(value)
  }

  const createComment = async (event) => {
    event.preventDefault()
    const postId = event.target.firstChild.id
    client
      .post(`/post/${postId}/comment`, { comment })
      .then(() => {
        setLoad((x) => !x)
        setComment('')
      })
      .catch((data) => {
        console.log(data)
      })
  }

  const handleComment = (event) => {
    event.preventDefault()
    const { value } = event.target
    setComment(value)
  }
  return (
    <>
      <Header role={role} />
      <section className='posts-section'>
        <p>Status: {postResponse.status}</p>
        <PostForm
          handleSubmit={createPost}
          handleChange={handleChange}
          post={post}
        />
        <ul className='posts-list'>
          {posts.map((post, index) => (
            <li key={index} className='post-item'>
              <Box>
                <div className='post-content'>{post.content}</div>
                <Stack spacing={2} direction='row'>
                  <Box variant='contained'>{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</Box>
                  <Box variant='contained'>
                    {dateTimetoRelativeTime(post.createdAt)}
                  </Box>
                </Stack>
              </Box>
              <div className='comments-section'>
                <form onSubmit={createComment}>
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
