import { Button, Avatar, Link } from '@mui/material';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../context/LoggedInUser';
import EditForm from './EditForm';
import client from '../../utils/client';
import StudentList from '../../components/studentList/StudentList';
import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import PostItem from '../posts/PostItem';
import PinnedPost from '../posts/PinnedPost';
import { renderPinnedPosts } from '../posts/utils/getAllPosts';

const Profile = () => {
  const [userDisplayed, setUserDisplayed] = useState({});
  const [successProfileUpdate, setSuccessProfileUpdate] = useState(false);
  const [errorProfileUpdate, setErrorProfileUpdate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pinnedPost, setPinnedPost] = useState([]);
  const [isTeacherorAdmin, setIsTeacherorAdmin] = useState(false);
  const [post, setPost] = useState({ content: '', isPinned: false });

  const userLoggedIn = useLoggedInUser().user;
  const location = useLocation();
  const navigate = useNavigate();
  const {
    first_name,
    last_name,
    biography,
    github_url,
    cohort_id,
    profile_image_url,
    role,
  } = userDisplayed;

  let isOwner = false;

  console.log('1 Profile loaded');

  useEffect(() => {
    console.log('use Effect Runs');
    if (location.state) {
      console.log('Location state: ', location.state);
      setUserDisplayed(location.state.user);


    } else {
      console.log('Set User Displayed to: ', userLoggedIn);
      setUserDisplayed(userLoggedIn);

    }
    console.log('useEffect Values posts rendered', posts);
    console.log('userDisplayed', userDisplayed);
    renderPinnedPosts(posts, setPosts, setPinnedPost, userDisplayed.id)
    


  }, [location, userLoggedIn]);

  const isAdmin = userLoggedIn?.role === 'ADMIN';

  if (userLoggedIn.id === userDisplayed.id) {
    isOwner = true;
  }
  const handleSubmit = newInfo => {
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
        setUserDisplayed(res.data.data.user);
        setSuccessProfileUpdate(true);
        setTimeout(() => {
          setSuccessProfileUpdate(false);
        }, '3000');
      })
      .catch(err => {
        console.error(err.response);
        setErrorProfileUpdate(true);
        setTimeout(() => {
          setErrorProfileUpdate(false);
        }, '3000');
      });
  };

  const handleAdminClick = () => {
    navigate('/account', { state: { user: userDisplayed } });
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
          <p>{biography}</p>
        </div>
        {isAdmin && !isOwner ? (
          <Button variant="outlined" onClick={handleAdminClick}>
            Account Information
          </Button>
        ) : (
          <></>
        )}
        {isOwner && <EditForm handleSubmit={handleSubmit} />}
      </div>
      {role !== 'TEACHER' && <StudentList />}
      {successProfileUpdate && (
        <Alert
          sx={{ maxWidth: 'fit-content', margin: 'auto' }}
          severity="success"
        >
          Profile updated successfully
        </Alert>
      )}
      {errorProfileUpdate && (
        <Alert
          sx={{ maxWidth: 'fit-content', margin: 'auto' }}
          severity="error"
        >
          Profile not updated
        </Alert>
      )}
      <div className="postProfile-display">
        <section className="posts-section">

          <PinnedPost 
            posts={pinnedPost} 
            userId={userLoggedIn}
            
            />

          {posts?.length > 0 ? (
            <ul className="posts-list">
              {posts?.map((post, index) => (
                <PostItem post={post} key={index} />
              ))}
            </ul>
          ) : (
            <p className="no-posts-message">
              There are no posts at the moment.
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default Profile;
