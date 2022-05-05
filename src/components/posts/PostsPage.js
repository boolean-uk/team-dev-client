import React from 'react'
import { useState, useEffect } from 'react'
import PostForm from './PostForm'
import client from '../../utils/client'
import './style.css'
import Header from '../Header/Header'
import Post from './Post'

const PostsPage = ({ role }) => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    client.get('/posts').then((res) => {
      setPosts(res.data.data.posts)
    })
  }, [postResponse])

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

  const onCommentAdded = (post, comment) => {
    setPosts(
      posts.map((updatedPost) =>
        updatedPost === post
          ? { ...post, postComments: [comment, ...post.postComments] }
          : updatedPost
      )
    )
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target
    setPost({
      ...post,
      [name]: value,
    })
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
              {/* <Box>
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
              </div> */}
              <Post post={post} onCommentAdded={onCommentAdded} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostsPage
