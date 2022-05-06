import React from 'react'
import { useState } from 'react'
import client from '../../utils/client'
import dateTimetoRelativeTime from './helperfunctions'
import { Box, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function PostComments({ onCommentAdded, post }) {
  const [comment, setComment] = useState('')
  const [showAll, setShowAll] = useState(false)

  const createComment = (event, postId) => {
    event.preventDefault()
    client
      .post(`/post/${postId}/comment`, { content: comment })
      .then((res) => {
        setComment('')
        onCommentAdded(post, res.data.data.comment)
      })
      .catch((data) => {
        console.log(data)
      })
  }

  const toggleCommentsList = () => {
    setShowAll((toggle) => !toggle)
  }

  const handleComment = (event) => {
    event.preventDefault()
    const { value } = event.target
    setComment(value)
  }

  return (
    <div className='comments-section'>
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
              id={post.id}
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
      <div className='single-comment'>
        {post.postComments && post.postComments.length > 1 && !showAll && (
          <div onClick={() => toggleCommentsList()}>
            show all
            <span className='commentCount'>
              {` (${post.postComments.length})`}
            </span>
          </div>
        )}
        {showAll && <div onClick={() => toggleCommentsList()}>hide</div>}
        {post.postComments && post.postComments.length !== 0 && !showAll ? (
          <Box>
            <div className='comment-content'>
              {post.postComments[0].content}
            </div>
            <Stack className='names-date' spacing={2} direction='row'>
              <Box className='fullname' variant='contained'>
                <strong>{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</strong>
              </Box>
              <Box className='date-time' variant='contained'>
                {dateTimetoRelativeTime(post.postComments[0].createdAt)}
              </Box>
            </Stack>
          </Box>
        ) : (
          ''
        )}
        <ul className='comments-list'>
          {showAll &&
            post.postComments.map((comment) => (
              <li key={comment.id} className='comment-item'>
                <Box>
                  <div className='comment-content'>{comment.content}</div>
                  <Stack className='names-date' spacing={2} direction='row'>
                    <Box className='fullname' variant='contained'>
                      <strong>{`${comment.user.profile.firstName} ${comment.user.profile.lastName}`}</strong>
                    </Box>
                    <Box className='date-time' variant='contained'>
                      {dateTimetoRelativeTime(comment.createdAt)}
                    </Box>
                  </Stack>
                </Box>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default PostComments
