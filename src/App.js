import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './App.css';

import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import Profile from './components/profile/Profile';
import EnrolmentPage from './pages/enrollment';
import Header from './components/Header/Header';
import client from './utils/client';
import Account from './components/account/Account';
import CreateCohort from './pages/createCohort';
import StudentList from './components/studentList/StudentList';

function App() {
  const [profileView, setProfileView] = useState(null)
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    biography: '',
    profile_image_url: '',
    github_url: '',
    email: ''
  });

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId === null) {
      return;
    }
    client
      .get(`/user/${userId}`)
      .then(res => setUser(res.data.data.user))
      .catch(err => console.log(err));
    // eslint-disable-next-line
  }, []);

  const getLoggedInUserId = () => {
    const loadedToken = localStorage.getItem('token');
    if (loadedToken === null || loadedToken === '') {
      return null;
    }
    const decoded = jwt_decode(loadedToken);
    return decoded.userId;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/cohort" element={<CreateCohort />} />
          <Route
            path="/posts"
            element={<PostsPage getUserId={getLoggedInUserId} setProfileView={setProfileView} />}
          />
          <Route path="/enrolment" element={<EnrolmentPage />} />
          <Route
            path="/profile"
            element={
              <Profile
                getLoggedInUserId={getLoggedInUserId}
                user={user}
                setUser={setUser}
                profileView={profileView}
              />
            }
          />
        </Route>
        <Route path="/account" element={
          <Account getLoggedInUserId={getLoggedInUserId} user={user} setUser={setUser} />} />
      </Routes>
    </div>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token');
  return !(loadedToken === '');
}

export default App;

const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <StudentList />
    </>
  )
};
