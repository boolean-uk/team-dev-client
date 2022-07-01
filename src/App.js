import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import DeliveryLogDash from './components/users/teachers/DeliveryLogDash';
import Profile from './components/profile/Profile';
import RenderListOfStudents from './components/searchBar/RenderListOfStudents';
import HomePage from './components/Home';
import client from './utils/client';
import { loggedInUserContext } from './Helper/loggedInUserContext';
import './App.css';

function App() {
  const [userDataToRender, setUserDataToRender] = useState({})
  const [nameToSearch, setNameToSearch] = useState({ userName: ""})
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem('loggedInUser'))
  );

  useEffect(() => {
    client
    .get(`/users?first_name=${nameToSearch}`)
    .then((res) => setUserDataToRender(res.data.data.users))
    .catch((err) => console.error(err.response))
  }, [nameToSearch] ) 
    
   
    return (
      <loggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser, userDataToRender, nameToSearch, setNameToSearch }}>
        <div className='App'>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<RegistrationPage />} />
            <Route element={<AuthenticateUser />}>
              <Route path='/home' element={<HomePage />} />
              <Route path='/users-list' element={<RenderListOfStudents/>} />
              <Route path='/profile/:id' element={<Profile />} />
            </Route>
            <Route element={<AuthenticateUser redirectPath={'/home'} requiredRole={['TEACHER']}/>}>
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

const AuthenticateUser = ({
  children,
  redirectPath = '/',
  requiredRole = ['STUDENT', 'TEACHER'],
}) => {
  const { loggedInUser } = useContext(loggedInUserContext);

  const userRoleMatchesRequiredRole = requiredRole.includes(loggedInUser?.role);

  if (!isLoggedIn() || !userRoleMatchesRequiredRole) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
