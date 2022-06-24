import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import DeliveryLogDash from './components/users/teachers/DeliveryLogDash'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { loggedInUserContext } from './Helper/loggedInUserContext';
import { useEffect, useState } from "react";


function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))  
    setLoggedInUser(user)
  },[])

  return (
    <loggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<RegistrationPage />} />
          <Route element={<AuthenticateUser />}>
            <Route path='/posts' element={<PostsPage />} />
          </Route>
        <Route path='/log' element={<DeliveryLogDash />} />
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

const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
