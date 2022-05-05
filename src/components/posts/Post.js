import dateTimetoRelativeTime from './helperfunctions'
import { Link } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import React from 'react'
import PostComments from './PostComments'

function Post({ post, onCommentAdded }) {
  return (
    <>
      {post.user && (
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
      )}
      <PostComments onCommentAdded={onCommentAdded} post={post} />
    </>
  )
}

export default Post
