import React from 'react';
import PostLike from './PostLike';
import dateTimetoRelativeTime from './helperfunctions';
import { Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import PostComments from './MainCommentComponent';
import ProfileImg from '../ProfileImg/ProfileImg';

function Post({ post, onCommentAdded, userId }) {
  return (
    <>
      <Box>
        <div className='post-content'>{post.content}</div>
        <Stack className='names-date' spacing={2} direction='row'>
          <Link to={`/user/${post.user.id}`} className='post-author'>
            <Box className='fullname' variant='contained'>
              <ProfileImg avatar={post.user.profile.profileImgUrl} />
              <strong>{`${post.user.profile.firstName} ${post.user.profile.lastName}`}</strong>
            </Box>
          </Link>
          <Box className='date-time' variant='contained'>
            {dateTimetoRelativeTime(post.createdAt)}
          </Box>
        </Stack>
      </Box>
      <Stack>
        <PostLike likes={post.postLike} postId={post.id} userId={userId} />
        <PostComments onCommentAdded={onCommentAdded} post={post} />
      </Stack>
    </>
  );
}

export default Post;
