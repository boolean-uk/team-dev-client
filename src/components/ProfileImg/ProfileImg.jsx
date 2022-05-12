import Avatar from '@mui/material/Avatar';
import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import client from '../../utils/client';
import storage from '../../utils/storage';

function ProfileImg({ avatar }) {
  const [profileImg, setProfileImg] = useState('');
  const localStorageResponse = storage.loadStorage()
  const userId = localStorageResponse.userId;

  useEffect(() => {
    client
      .get(`/user/${userId}`)
      .then((res) => {
        setProfileImg(res.data.data.user.profileImgUrl);
      })
      .catch((err) => {
        console.log('Something went wrong when loading the profile image...', err.response)
      });
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
  } else if (profileImg && avatar !== '') {
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
