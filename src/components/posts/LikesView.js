import {
  Dialog,
  List,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItem,
  ClickAwayListener,
} from '@mui/material';
import React from 'react';

export const LikesView = ({ post, openDialog, setOpenDialog }) => {
  return (
    <Dialog
        open={openDialog}
        sx={{
          width: '100%',
          // height: '300px'
        }}
      >
      <ClickAwayListener onClickAway={() => setOpenDialog(false)}>
        <List alignItems="flex-start">
          {post.likes.map((like, i) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    key={i}
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
    </Dialog>
  );
};
