import { useState } from 'react';
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
