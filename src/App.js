import './App.css';
import LoginPage from './components/users/login/LoginPage';
import RegistrationPage from './components/users/registration/RegistrationPage';
import PostsPage from './components/posts/PostsPage';
import EnrolmentPage from './pages/enrollment'

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path='/posts' element={<PostsPage />} />
          <Route path='/enrolment' element={<EnrolmentPage />} />
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

  return <Header companyName={`Cohort Manager 2.0`} />;
};
