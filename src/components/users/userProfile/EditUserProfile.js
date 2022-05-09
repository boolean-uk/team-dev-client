import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../../utils/client';
import Header from '../../Header/Header';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css';

const UserForm = ({ role }) => {
	const initialFormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		biography: '',
		githubUrl: '',
		profileImgUrl: ''
	};

	const [profile, setProfile] = useState(initialFormData);
	const [editUserResponse, setEditUserResponse] = useState('');

	let navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		client
			.get(`/user/${id}`)
			.then((res) => {
				setProfile(res.data.data.user);
			})
			.catch((err) => console.log(err.response));
	}, [id]);

	const handleChange = (event) => {
		event.preventDefault();
		const { value, name } = event.target;

		setProfile({
			...profile,
			[name]: value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const putBody = {
			firstName: profile.firstName,
			lastName: profile.lastName,
			bio: profile.biography,
			githubUrl: profile.githubUrl,
			profileImgUrl: profile.profileImgUrl
		};
		client
			.put('/user', putBody)
			.then((res) => {
				setEditUserResponse(res.data);
				navigate(`/user/${id}`);
			})
			.catch((err) => {
				console.log(err);
				console.log(editUserResponse);
			});
	};

	return (
		<>
			<Header role={role} />
			<section className='edit-user-form'>
				<h1> Edit Profile Details </h1>
				<form onSubmit={onSubmit}>
					<TextField
						className='user-form-input'
						value={profile.firstName}
						variant='outlined'
						name='firstName'
						onChange={handleChange}
						placeholder='First name'
					/>
					<TextField
						className='user-form-input'
						value={profile.lastName}
						variant='outlined'
						name='lastName'
						onChange={handleChange}
						placeholder='Last name'
					/>
					<TextField
						className='user-form-input'
						value={profile.biography}
						variant='outlined'
						name='biography'
						onChange={handleChange}
						placeholder='Bio'
					/>
					<TextField
						className='user-form-input'
						type='url'
						value={profile.githubUrl}
						variant='outlined'
						name='githubUrl'
						onChange={handleChange}
						placeholder='GitHub URL'
					/>
					<TextField
						className='user-form-input'
						label='Avatar URL'
						variant='outlined'
						name='avatar'
            onChange={handleChange}
					/>
					<Button id='user-submit-button' type='submit' variant='contained'>
						Update Profile
					</Button>
				</form>
			</section>
		</>
	);
};

export default UserForm;
