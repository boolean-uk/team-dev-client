import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { useState } from 'react'
import './style.css';

import EditForm from './EditForm';
import client from '../../utils/client';
import StudentList from '../../components/studentList/StudentList';
import { Alert } from '@mui/material' 

const Profile = ({ getLoggedInUserId, user, setUser, profileView, setProfileView }) => {
    const { first_name, last_name, biography, github_url, cohort_id, profile_image_url, role } = user
    const [ successProfileUpdate, setSuccessProfileUpdate ] = useState(false)
    const [ updateProfileError, setUpdateProfileError ] = useState(false)

  const handleSubmit = event => {
    event.preventDefault();

    const reqBody = {
      firstName: first_name,
      lastName: last_name,
      bio: biography,
      githubUrl: github_url,
      profileImageUrl: profile_image_url,
    };

    const userId = getLoggedInUserId();
    if (userId === null) {
      return;
    }

    client
      .patch('/user/myprofile', reqBody)
      .then(res => {
          setUser(res.data.data.user);
          setSuccessProfileUpdate(true);
          setTimeout(() => {
            setSuccessProfileUpdate(false);
          }, '3000');
        })

      .catch(err => {
        setUpdateProfileError(true);

        setTimeout(() => {
          setSuccessProfileUpdate(false);
        }, '3000');
        });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

    return (
      <>
        <div className="profile">
          <Avatar
            alt="Profile Pic"
            sx={{ width: 325, height: 325, border: '#4b4b56 solid 5px' }}
            src={profile_image_url}
          />
          <h1>
            {first_name} {last_name}
          </h1>
          <div className="profile-info">
            <div>
              <p>Cohort: {cohort_id === null ? 'N/A' : cohort_id}</p>
              <Link
                href={github_url}
                sx={{ textDecoration: 'none' }}
                underline="hover"
              >
                My GitHub
              </Link>
            </div>
            <p>"{biography}"</p>
          </div>
          {!profileView && (
            <EditForm
              user={user}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          )}
        </div>
        {role !== 'TEACHER' && (
          <StudentList setUser={setUser} setProfileView={setProfileView} />
        )}
        {successProfileUpdate && (
          <Alert sx={{ maxWidth: '40%', margin: 'auto' }} severity="success">
            Profile updated successfully
          </Alert>
        )}
        {updateProfileError && (
          <Alert sx={{ maxWidth: '40%', margin: 'auto' }} severity="error">
            Profile not updated
          </Alert>
        )}
      </>
    );
}


export default Profile;
