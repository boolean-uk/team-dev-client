import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import ViewCohort from './pages/viewCohort';
import Exercise from './components/exercise/Exercise';
import CreateExercise from './components/exercise/CreateExercise';
import ExerciseView from './components/exercise/ExerciseView';
import DeveloperPage from './components/developer/DeveloperPage';
import ModuleList from './components/module/ModuleList';
import ModuleView from './components/module/ModuleView';
import UnitList from './components/unit/UnitList';
import LessonList from './components/lessons/LessonList';
import UnitView from './components/unit/UnitView';
import LessonView from './components/lessons/LessonView';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getLoggedInUserId();
    if (userId === null) {
      return;
    }
    client.get(`/user/${userId}`).catch(err => {
      const authMessage = err.response?.data?.data?.authentication;
      if (authMessage === 'Token has expired') {
        navigate('/', { state: { token: 'expired' } });
      } else {
        console.error(err);
      }
    });
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
          <Route path='/events' element={<DeveloperPage />} />
          <Route path="/cohort" element={<CreateCohort />} />
          <Route
            path="/user/:id/profile"
            element={<Profile getLoggedInUserId={getLoggedInUserId} />}
          />
          <Route path="/cohort/:cohortId" element={<ViewCohort />} />
          <Route
            path="/posts"
            element={<PostsPage getUserId={getLoggedInUserId} />}
          />
          <Route path="/enrolment" element={<EnrolmentPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/exercise/create" element={<CreateExercise />} />
          <Route path="/exercise/:id" element={<ExerciseView />} />
          <Route path="/module" element={<ModuleList />} />
          <Route path="/unit" element={<UnitList />} />
          <Route path="/lesson" element={<LessonList />} />
          <Route path="/module/:id" element={<ModuleView />} />
          <Route path="/unit/:id" element={<UnitView />} />
          <Route path="/lesson/:id" element={<LessonView />} />
        </Route>
      </Routes>
    </div>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token');
  return loadedToken?.length > 1;
}

export default App;

const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
    </>
  );
};
