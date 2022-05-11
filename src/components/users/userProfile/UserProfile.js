import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../../utils/client';
import { useParams } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [profile, setProfile] = useState('');
  const [profileImg, setProfileImg] = useState('');
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
        const firstName = res.data.data.user.firstName;
        const lastName = res.data.data.user.lastName;
        fetch(`https://ui-avatars.com/api/?name=${firstName}+${lastName}`).then(
          (res) => {
            setProfileImg(res.url);
          }
        );
      })
      .catch((err) => console.log(err.response));
  };

  const handleEditProfileLink = () => {
    if (id === loggedInId) {
      return setCheckId(true);
    }
    setCheckId(false);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div className='profile'>
        <div>
          <img className='profile-img' src={profileImg} alt='avatar' />
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
              className='link'>
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
