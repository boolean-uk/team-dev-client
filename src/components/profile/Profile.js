import { Button, Avatar, Link, Dialog } from '@mui/material';
import './style.css';
import {useLoggedInUser} from '../../context/LoggedInUser'
import EditForm from './EditForm';
import client from '../../utils/client';
import StudentList from '../../components/studentList/StudentList';
import { useState } from 'react';
import { ChangeRole } from '../admin/ChangeRole';

const Profile = ({ getLoggedInUserId, user, setUser, profileView, setProfileView }) => {
  const [isopen, setIsOpen] = useState(false)
  const userLoggedIn = useLoggedInUser().user
  const isAdmin = userLoggedIn?.role === 'TEACHER'
  console.log(userLoggedIn)
  const { first_name, last_name, biography, github_url, cohort_id, profile_image_url, role } = user

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
      .then(res => setUser(res.data.data.user))
      .catch(err => console.error(err.response));
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
                (!profileView) && <EditForm
                    user={user}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
              }
            </div>
            <div>
              
                <Dialog open={isopen}>
                  <ChangeRole setIsOpen={setIsOpen} user={user}/>
                </Dialog>
                
            </div>
            {role !== 'TEACHER' && <StudentList setUser={setUser} setProfileView={setProfileView} />}
        </>
    )
}


export default Profile;
