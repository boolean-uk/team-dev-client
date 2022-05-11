import Avatar from '@mui/material/Avatar';
import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import client from '../../utils/client';

function ProfileImg({ avatar }) {
  const userId = localStorage.getItem('userId');
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    client
      .get(`/user/${userId}`)
      .then((res) => {
        setProfileImg(res.data.data.user.profileImgUrl);
      })
      .catch((err) => console.log(err.response));
  }, []);

  if (avatar) {
    return (
      <img
        src={avatar}
        alt='user avatar'
        className='profile-img'
        width='60px'
      />
    );
  } else if (profileImg) {
    return <img
    src={profileImg}
    alt='user avatar'
    className='profile-img'
    width='60px'
  />;
  }
  return (
    <Avatar />
  );
}

export default ProfileImg;
