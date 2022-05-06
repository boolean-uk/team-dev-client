import React from 'react';
import { useState, useEffect } from 'react'
import PostForm from './PostForm';
import Post from './Post';
import client from '../../utils/client';
import './style.css';
import Header from '../Header/Header';

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
              <Post post={post} onCommentAdded={onCommentAdded} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default PostsPage
