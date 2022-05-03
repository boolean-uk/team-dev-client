import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../../utils/client';
import { useParams } from 'react-router-dom';

const UserForm = () => {

  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    biography: '',
    githubUrl: ''
  }
  const [profile, setProfile] = useState(initialFormData);
  const { id } = useParams();

  useEffect(() => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  }, [])
  
  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setProfile({
      ...profile,
      [name]: value,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        password: profile.password,
        biography: profile.biography,
        githubUrl: profile.githubUrl,
      }),
    };
    fetch(`/user/${id}`, options)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <h1> Edit Profile Details </h1>
      <form onSubmit={onSubmit} className='user-form'>
        <TextField
          className='user-form-input'
          value={profile.firstName}
          variant='outlined'
          name='firstName'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          value={profile.lastName}
          variant='outlined'
          name='lastName'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          type='email'
          value={profile.email}
          variant='outlined'
          name='email'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          type='password'
          label='Password'
          variant='outlined'
          name='password'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          value={profile.biography}
          variant='outlined'
          name='biography'
          onChange={handleChange}
        />
        <TextField
          className='user-form-input'
          type='url'
          value={profile.githubUrl}
          variant='outlined'
          name='githubUrl'
          onChange={handleChange}
        />
        <Button id='user-submit-button' type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
