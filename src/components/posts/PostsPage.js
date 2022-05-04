import React from 'react'
import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import { Box, Stack } from '@mui/material'
import Header from '../Header/Header'
import dateTimetoRelativeTime from './helperfunctions'

const PostsPage = ({ role }) => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [comment, setComment] = useState('')
  const [load, setLoad] = useState(true)
  const [showAllArr, setShowAll] = useState([])

  useEffect(() => {
    client.get('/posts').then((res) => {
      setPosts(res.data.data.posts)
    })
  }, [load])
  const createPost = async (event) => {
    event.preventDefault()
    client
      .post('/post', post)
      .then((res) => {
        setPostResponse(res.data)
        setPosts((posts) => [res.data.data.post, ...posts])
        setLoad((x) => !x)
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

  const createComment = async (event, postId) => {
    event.preventDefault()
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

  const addToShowedComments = (id) => {
    !showAllArr.some((a) => a === id) && setShowAll((x) => [...x, id])
  }

  const removeFromShowedComments = (id) => {
    setShowAll((x) => x.filter((c) => c !== id))
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
          inputValue={post.content}
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
                <form onSubmit={(event) => createComment(event, post.id)}>
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
                <div className='single-comment'>
                  {post.postComments &&
                    post.postComments.length > 1 &&
                    !showAllArr.includes(post.id) && (
                      <div onClick={() => addToShowedComments(post.id)}>
                        show all
                        <span className='commentCount'>
                          {` (${post.postComments.length})`}
                        </span>
                      </div>
                    )}
                  {showAllArr.includes(post.id) && (
                    <div onClick={() => removeFromShowedComments(post.id)}>
                      hide
                    </div>
                  )}
                  {post.postComments &&
                  post.postComments.length !== 0 &&
                  !showAllArr.includes(post.id)
                    ? post.postComments[0].content
                    : ''}
                  <ul className='comments-list'>
                    {showAllArr.includes(post.id) &&
                      post.postComments.map((comment) => (
                        <li key={comment.id} className='comment-item'>
                          {comment.content}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostsPage
