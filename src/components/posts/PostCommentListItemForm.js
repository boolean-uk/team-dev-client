import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import client from '../../utils/client'

function CommentForm({ post, onCommentAdded }) {
  const [comment, setComment] = useState('')

  const createComment = (event, postId) => {
    event.preventDefault()
    client
      .post(`/post/${postId}/comment`, { content: comment })
      .then((res) => {
        setComment('')
        onCommentAdded(post, res.data.data.comment)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleComment = (event) => {
    event.preventDefault()
    const { value } = event.target
    setComment(value)
  }
  return (
    <>
      {post.id && (
        <Box
          sx={{
            width: '100%',
            padding: '0.5em 0',
            height: '2em',
            margin: '0',
          }}>
          <form onSubmit={(event) => createComment(event, post.id)}>
            <TextField
              id={String(post.id)}
              type='text'
              className='post__comment'
              onChange={handleComment}
              name='comment'
              value={comment}
              placeholder='Write a comment...'
            />
            <Button
              className='comment-button'
              type='submit'
              size='small'
              variant='contained'>
              Comment
            </Button>
          </form>
        </Box>
      )}
    </>
  )
}
export default CommentForm
