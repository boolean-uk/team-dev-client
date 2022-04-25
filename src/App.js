import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import Header from './components/Header/Header';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Header companyName={`Cohort Manager 2.0`} />

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
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
