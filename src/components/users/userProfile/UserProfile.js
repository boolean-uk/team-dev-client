import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../../utils/client';
import { useParams } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
import ProfileImg from '../../ProfileImg/ProfileImg'

const UserProfile = () => {
  const [profile, setProfile] = useState('');
  // const [profileImg, setProfileImg] = useState('');
  const [checkId, setCheckId] = useState(false);
  const { id } = useParams();
  const loggedInId = localStorage.getItem('userId');

  useEffect(() => {
    handleProfile();
    handleEditProfileLink();
  }, [id]);

  const handleProfile = () => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  };

  const handleEditProfileLink = () => {
    if (id === loggedInId) {
      return setCheckId(true);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className='profile'>
        <div>
          {<ProfileImg/>}
        </div>
        <div className='profile-info'>
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.biography}</p>
          <p>Github: {profile.githubUrl}</p>
          {checkId && (
            <Link
              id='edit-profile-button'
              to={`/user/edit/${id}`}
              className='link'
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
