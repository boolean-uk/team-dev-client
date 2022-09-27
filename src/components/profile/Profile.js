import { Button, Avatar, Link, Dialog } from '@mui/material';
import './style.css';
import {useLoggedInUser} from '../../context/LoggedInUser'
import EditForm from './EditForm';
import client from '../../utils/client';
import StudentList from '../../components/studentList/StudentList';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoggedInUser } from '../../context/LoggedInUser';

const Profile = () => {
  const location = useLocation()
  const [userDisplayed, setUserDisplayed] = useState({})
  const [isopen, setIsOpen] = useState(false)
  const isAdmin = userLoggedIn?.role === 'TEACHER'
  console.log(userLoggedIn)
const { first_name, last_name, biography, github_url, cohort_id, profile_image_url, role } = userDisplayed
  const userLoggedIn = useLoggedInUser().user
  let isOwner = false

  if (userLoggedIn.id === userDisplayed.id) {
    isOwner = true
  }

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


    setUser({
      ...user,
      [name]: value,
    });
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
        {isAdmin ? <Button variant='outlined' onClick={() => setIsOpen(true)}>
                  Account Informations</Button> :
                (isOwner) && <EditForm
          handleSubmit={handleSubmit}
        />
              }
            </div>
            <div>
              
                <Dialog open={isopen}>
                  <ChangeRole setIsOpen={setIsOpen} user={user}/>
                </Dialog>
                
      </div>
      {role !== 'TEACHER' && <StudentList />}
    </>
  )


export default Profile;
