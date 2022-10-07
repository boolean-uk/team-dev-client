import {
  Dialog,
  List,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItem,
  ClickAwayListener,
  DialogContent,
} from '@mui/material';
import React from 'react';

export const LikesView = ({ post, openDialog, setOpenDialog, handleClick }) => {
  return (
    <Dialog open={openDialog} scroll="body">
      <DialogContent>
        <ClickAwayListener onClickAway={() => setOpenDialog(false)}>
          <List sx={{ cursor: 'pointer' }}>
            {post.likes.map(like => {
              return (
                <ListItem
                  key={like.postId + like.userId}
                  onClick={e => handleClick(e, like.user.id)}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={like.user.profile.profileImageUrl}
                      alt={like.user.profile.firstName}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${like.user.profile.firstName} ${like.user.profile.lastName}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </ClickAwayListener>
      </DialogContent>
    </Dialog>
  );
};
