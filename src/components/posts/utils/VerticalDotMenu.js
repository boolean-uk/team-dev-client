import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ToggleSwitch from './ToggleSwitch';
import client from '../../../utils/client';

const ITEM_HEIGHT = 48;

export default function VerticalDotMenu({ post, setPostResponse}) {
    const [values, setValues] = React.useState({ isPrivate: null })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        setValues({...values, isPrivate: post.isPrivate})
    // eslint-disable-next-line
    }, [post])
    
    const handleClick = (event) => {
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
                .then(res => setPostResponse(res.data))
                .catch(err => {
                    console.error(err.response)
                });
        }
    };

    const options = [
      <ToggleSwitch labelText={'Post private'} val={values} handleChange={handleChange} />,
    ];
    
  return (
    <div className='post-vertical-menu'>
      <IconButton
        sx={{'&:hover': { backgroundColor: 'transparent', }}}
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
        anchorOrigin={{ vertical: 'center', horizontal: 39, }}
        transformOrigin={{ vertical: 18, horizontal: 0, }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem sx={{ '& *': { gap: '2.5rem'} }} key={option} >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
