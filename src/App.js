import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import Profile from './components/profile/Profile';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

function App() {

  const [user, setUser] = useState({
    first_name: "Nathan",
    last_name: "King",
    biography: "Hello world",
    github_url: "https://github.com/vherus"
  })

  const [token] = useState(`Bearer ${process.env.REACT_APP_USER_TOKEN}`)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/4`, {
      method: "GET",
      headers: { Authorization: token }
    })
      .then(resp => resp.json())
      .then(data => setUser(data.data.user))
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route path='/profile' element={<Profile profileData={user} />} />
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
