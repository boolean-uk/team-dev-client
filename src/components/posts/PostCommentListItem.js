import React from 'react'
import dateTimetoRelativeTime from './helperfunctions'
import { Box, Stack } from '@mui/material'

function CommentItem({ comment }) {
  if (!comment.user) {
    return <></>
  }
  return (
    <li className='comment-item'>
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
  )
}
export default CommentItem
