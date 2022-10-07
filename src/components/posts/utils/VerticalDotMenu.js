import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ToggleSwitch from './ToggleSwitch';
import ToggleASwitch from './ToggleOther';
import client from '../../../utils/client';
import { useLocation } from 'react-router-dom';

const ITEM_HEIGHT = 48;

export default function VerticalDotMenu({
  post,
  setPostResponse,
  setErrorPinPost,
  setErrorPrivatePost,
}) {
  const [values, setValues] = React.useState({
    isPrivate: null,
    isPinned: null,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  React.useEffect(() => {
    setValues({ isPrivate: post.isPrivate, isPinned: post.isPinned });
    // eslint-disable-next-line
  }, [post]);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = event => {
    if (event.target.name === 'switch') {
      setValues({
        ...values,
        isPrivate: !post.isPrivate,
      });
      client
        .patch(`/post/${post.id}/status`, { isPrivate: values.isPrivate })
        .then(res => {
          setPostResponse(res.data);
        })
        .catch(err => {
          setPostResponse({ ...err.data });
          console.error(err.response);
          setErrorPrivatePost(err.response.data.message);
          setTimeout(() => {
            setErrorPrivatePost('');
          }, '3000');
        });
    }
  };

  const handleToggle = event => {
    if (event.target.name === 'toggle') {
      setValues({
        ...values,
        isPinned: !post.isPinned,
      });
      client
        .patch(`/post/${post.id}/pinned`, { isPinned: values.isPinned })
        .then(res => {
          setPostResponse(res.data);
        })
        .catch(err => {
          setPostResponse({ ...err });
          console.error(err);
          setErrorPinPost(err.response.data.message);
          setTimeout(() => {
            setErrorPinPost('');
          }, '3000');
        });
    }
  };

  const options = [
    <ToggleSwitch
      labelText={'Post private'}
      val={values.isPrivate}
      handleChange={handleChange}
    />,
  ];

  if (location.pathname === '/profile') {
    options.unshift(
      <ToggleASwitch
        labelText={'Post pinned'}
        val={values.isPinned}
        handleToggle={handleToggle}
      />
    );
  }

  return (
    <div className="post-vertical-menu">
      <IconButton
        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 39 }}
        transformOrigin={{ vertical: 18, horizontal: 0 }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem sx={{ '& *': { gap: '2.5rem' } }} key={index}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
