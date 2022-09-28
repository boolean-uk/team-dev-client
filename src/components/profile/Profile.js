import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import './style.css';

import EditForm from './EditForm';
import client from '../../utils/client';
import StudentList from '../../components/studentList/StudentList';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../context/LoggedInUser';

const Profile = () => {
  const location = useLocation()
  const [userDisplayed, setUserDisplayed] = useState({})
  const { first_name, last_name, biography, github_url, cohort_id, profile_image_url, role } = userDisplayed
  const userLoggedIn = useLoggedInUser().user
  let isOwner = false

  useEffect(() => {
    if (location.state) {
      setUserDisplayed(location.state.user)
    } else {
      setUserDisplayed(userLoggedIn)
    }
  }, [location, userLoggedIn])

  const handleSubmit = (newInfo) => {
    const reqBody = {
      firstName: newInfo.first_name,
      lastName: newInfo.last_name,
      bio: newInfo.biography,
      githubUrl: newInfo.github_url,
      profileImageUrl: newInfo.profile_image_url,
    };

    const userId = userLoggedIn.id;
    if (userId === null) {
      return;
    }

    client
      .patch('/user/myprofile', reqBody)
      .then(res => {
        setUserDisplayed(res.data.data.user)
      })
      .catch(err => console.error(err.response));
  };


  return (
    <>
      <div className='profile'>
        <Avatar
          alt="Profile Pic"
          sx={{ width: 325, height: 325, border: '#4b4b56 solid 5px' }}
          src={profile_image_url}
        />
        <h1>{first_name} {last_name}</h1>
        <div className='profile-info'>
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
        {isOwner && <EditForm
          handleSubmit={handleSubmit}
        />}
      </div>
      {role !== 'TEACHER' && <StudentList />}
    </>
  )
}


export default Profile;
