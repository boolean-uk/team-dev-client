import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from './PostForm'
import client from '../../utils/client'
import Comment from './comments'
import './style.css'

const PostsPage = () => {
  const [post, setPost] = useState({ content: '' })
  const [postResponse, setPostResponse] = useState('')
  const [posts, setPosts] = useState([])
  const [commentResponse, setcommentResponse] = useState({})
  const [load, setLoad] = useState(true)
  const [comment, setComment] = useState('')
  let navigate = useNavigate()

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

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '')
    navigate('../', { replace: true })
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
    <section className='posts-section'>
      <button id='user-signout-button' onClick={signOut}>
        sign out
      </button>
      <p>Status: {postResponse.status}</p>
      <PostForm handleSubmit={createPost} handleChange={handleChange} />
      <ul className='posts-list'>
        {posts.map((post) => (
          <li key={post.id} className='post-item'>
            {post.content}
            <Comment post={post} createComment={createComment} handleComment={handleComment} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PostsPage
