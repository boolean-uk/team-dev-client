import Avatar from '@mui/material/Avatar';
import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import client from '../../utils/client';

function ProfileImg({ avatar }) {
	console.log(avatar);
	const userId = localStorage.getItem('userId');
	const [profileImg, setProfileImg] = useState('');
	console.log('can you see me: ', profileImg);
	useEffect(() => {
		client
			.get(`/user/${userId}`)
			.then((res) => {
				setProfileImg(res.data.data.user.profileImgUrl);
			})
			.catch((err) => console.log(err.response));
	}, []);
	if (profileImg === '') {
		return <Avatar className='profile-img' />;
	} else if (avatar === undefined) {
		avatar = profileImg;
	}
	return (
		<img
			src={avatar}
			alt='user avatar'
			className='profile-img'
			width='60px'
		/>
	);
}

export default ProfileImg;
