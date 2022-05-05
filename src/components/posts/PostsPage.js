import React from 'react'
import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import { Box, Stack } from '@mui/material'
import Header from '../Header/Header'
import dateTimetoRelativeTime from './helperfunctions'
import { Link } from 'react-router-dom'
import PostComments from './PostComments'

const PostsPage = ({ role }) => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [comment, setComment] = useState('')
  const [showAllArr, setShowAll] = useState([])

  useEffect(() => {
    client.get('/posts').then((res) => {
      setPosts(res.data.data.posts)
    })
  }, [postResponse, comment])
  const createPost = (event) => {
    event.preventDefault()
    client
      .post('/post', post)
      .then((res) => {
        setPostResponse(res.data)
        setPosts((posts) => [res.data.data.post, ...posts])
      })
      .catch((data) => {
        console.log(data)
      })
    setPost(() => ({ content: '' }))
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    setPost({
      ...post,
      [name]: value,
    })
  }

  const createComment = (event, postId) => {
    event.preventDefault()
    client
      .post(`/post/${postId}/comment`, { comment })
      .then(() => {
        setComment('')
      })
      .catch((data) => {
        console.log(data)
      })
  }

  const addToShowedComments = (postId) => {
    !showAllArr.some((id) => id === postId) &&
      setShowAll((previousArr) => [...previousArr, postId])
  }

  const removeFromShowedComments = (postId) => {
    setShowAll((previousArr) => previousArr.filter((id) => id !== postId))
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
        {postResponse.status}
        <PostForm
          handleSubmit={createPost}
          handleChange={handleChange}
          inputValue={post.content}
        />
        <ul className='posts-list'>
          {posts.map((post, index) => (
            <li key={index} className='post-item'>
              <Box>
                <div className='post-content'>{post.content}</div>
                <Stack className='names-date' spacing={2} direction='row'>
                  <Link to={`/user/${post.user.id}`} className='post-author'>
                    <Box className='fullname' variant='contained'>
                      <strong>{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</strong>
                    </Box>
                  </Link>
                  <Box className='date-time' variant='contained'>
                    {dateTimetoRelativeTime(post.createdAt)}
                  </Box>
                </Stack>
              </Box>
              <PostComments 
              createComment = {createComment}
              handleComment = {handleComment}
              removeFromShowedComments = {removeFromShowedComments}
              addToShowedComments = {addToShowedComments}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostsPage
