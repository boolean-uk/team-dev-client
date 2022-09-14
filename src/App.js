import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import Profile from './components/profile/Profile';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

function App() {
  const [profileData] = useState({
    first_name: 'Nathan',
    last_name: 'King',
    biography: 'Hello world',
    github_url: 'https://github.com/vherus',
  });

  const [user, setUser] = useState({
    first_name: "Nathan",
    last_name: "King",
    biography: "Hello world",
    github_url: "https://github.com/vherus"
  })

  const [token] = useState(`Bearer ${localStorage.getItem(process.env.REACT_APP_USER_TOKEN)}`)

  useEffect(() => {
    const userId = getLoggedInUserId()
    if (userId === null) {
      return
    }
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: { Authorization: token }
    })
      .then(resp => resp.json())
      .then(data => setUser(data.data.user))
    // eslint-disable-next-line
  }, [])

  const getLoggedInUserId = () => {
    const loadedToken = localStorage.getItem('token');
    if (loadedToken === null) {
      return null
    }
    const decoded = jwt_decode(loadedToken)
    return decoded.userId
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route
          path='/profile'
          element={<Profile profileData={profileData} />}
        />
        <Route element={<AuthenticateUser />}>
          <Route path='/posts' element={<PostsPage />} />
        </Route>
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

  return <Outlet />;
};
