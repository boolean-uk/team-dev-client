import Avatar from '@mui/material/Avatar';
import React from 'react';
import './style.css';

// check if the user specified an image url
// if they haven't use the mui avatar
// otherwise render the image specified

function ProfileImg() {
  const profileImgUrl = localStorage.getItem('profileImgUrl')
	if (profileImgUrl === '') {
		return <Avatar className='profile-img' />;
	}
	return <img src={profileImgUrl} alt='user avatar' className='profile-img' />;
}

export default ProfileImg;
