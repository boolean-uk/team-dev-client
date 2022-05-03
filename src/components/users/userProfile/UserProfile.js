import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../../utils/client';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';


const UserProfile = () => {

  const [profile, setProfile] = useState('');
  const { id } = useParams();
  let role = profile.role

  useEffect(() => {
<<<<<<< HEAD
      handleFindProfile()
  }, [])
  console.log("user profile:", profile)
  const handleFindProfile = () => {
    client.get(`/user/${id}`)
    .then(res => {
        setProfile(res.data.data.user)
    })
    .catch(err => console.log(err.response))
  };
=======
      client
        .get(`/user/${id}`)
        .then((res) => {
          setProfile(res.data.data.user);
        })
        .catch((err) => console.log(err.response));
  }, [id]);
>>>>>>> b37e43cd1914ed7caa782c0036f5b49c8a353a21

  return (
    <div>
      <Header role={role}/>
      <h1>User Profile</h1>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.biography}</p>
      <p>Github: {profile.githubUrl}</p>
    </div>
  );
};

export default UserProfile;
