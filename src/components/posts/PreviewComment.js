import React from 'react';
import dateTimetoRelativeTime from './helperfunctions';
import { Box, Stack } from '@mui/material';
import ProfileImg from '../ProfileImg/ProfileImg';

function PreviewComment({ post }) {
  return (
    <Box>
      <div className='comment-content'>{post.postComments[0].content}</div>
      <Stack className='names-date' spacing={2} direction='row'>
        <Box className='fullname' variant='contained'>
        <ProfileImg avatar={post.postComments[0].user.profile.profileImgUrl}/>
          <strong>{`${post.postComments[0].user.profile.firstName} ${post.postComments[0].user.profile.lastName}`}</strong>
        </Box>
        <Box className='date-time' variant='contained'>
          {dateTimetoRelativeTime(post.postComments[0].createdAt)}
        </Box>
      </Stack>
    </Box>
  );
}

export default PreviewComment;
