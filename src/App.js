import './App.css';
import React from 'react';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import EditUser from './components/users/userProfile/EditUserProfile';
import ProfilePage from './components/users/userProfile/UserProfile';
import ViewCohort from './components/users/viewCohorts/viewCohorts';
import AddCohort from './components/addCohort/AddCohort';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import SearchPage from './components/search/SearchPage';
import storage from './utils/storage'

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null)
 
  useEffect(() => {
   setLoggedInUser(storage.loadStorage())
  }, [])
  
  //This if statment is here to stop user Authenticate running before the information is set
  if (loggedInUser === null) {
    return <div className='App'></div>
  }

  return (
    <div className='App'>
      <Routes>
        <Route path="/login" element={<LoginPage token={loggedInUser.token} setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser setSearchInput={setSearchInput} loggedInUser={loggedInUser} />}>
          <Route path="/" element={<PostsPage role={loggedInUser.role} userId={loggedInUser.userId} />} />
          <Route path="/user/:id" element={<ProfilePage userId={loggedInUser.userId} />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/cohort/:id" element={<ViewCohort />} />
          <Route path="/add-cohort" element={<AddCohort />} />
          <Route path="/search" element={<SearchPage searchInput={searchInput} />} />
        </Route>
      </Routes>
    </div>
  );
}

function isLoggedIn(loggedInUser) {
  return loggedInUser !== false
}

const AuthenticateUser = ({ children, redirectPath = '/login', setSearchInput, loggedInUser }) => {
  if (!isLoggedIn( loggedInUser)) {
    return <>
      <Navigate to={redirectPath} replace />;
    </>;
  }

  return <>
    <Header setSearchInput={setSearchInput} role={loggedInUser.role} userId={loggedInUser.userId} />
    <Outlet />
  </>;
};

export default App;

