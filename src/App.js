import { useState, useContext } from 'react';
import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import DeliveryLogDash from './components/users/teachers/DeliveryLogDash'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { loggedInUserContext } from './Helper/loggedInUserContext';

import Profile from './components/profile/Profile';


function App() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser'))  );

  return (
    <loggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route element={<AuthenticateUser />}>
            <Route path='/posts' element={<PostsPage />} />

            <Route path='/profile/:id' element={<Profile />} />
          </Route>
          <Route element={<AuthenticateUser redirectPath={'/posts'} requiredRole={['TEACHER']}/>}>
            <Route path='/log' element={<DeliveryLogDash />} />
          </Route>
        </Routes>
      </div>
    </loggedInUserContext.Provider>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token');
  return !(loadedToken === '');
}

export default App;


const AuthenticateUser = ({ children, redirectPath = '/', requiredRole=['STUDENT', 'TEACHER'] }) => {
  const { loggedInUser } = useContext(loggedInUserContext);

  const userRoleMatchesRequiredRole = requiredRole.includes(loggedInUser.role)

  if (!isLoggedIn() || !userRoleMatchesRequiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};