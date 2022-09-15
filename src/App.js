import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import "./App.css";

import LoginPage from "./components/users/login/LoginPage";
import RegistrationPage from "./components/users/registration/RegistrationPage";
import PostsPage from "./components/posts/PostsPage";
import Profile from "./components/profile/Profile";
import EnrolmentPage from "./pages/enrollment";
import Header from "./components/Header/Header";
import client from "./utils/client";

function App() {
  const [user, setUser] = useState({
    first_name: "Nathan",
    last_name: "King",
    biography: "Hello world",
    github_url: "https://github.com/vherus",
  });

  useEffect(() => {
    const userId = getLoggedInUserId()
    if (userId === null) { return }

    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      method: "GET",
      headers: { Authorization: token }
    })
      .then(resp => resp.json())
      .then(data => setUser(data.data.user))
    // eslint-disable-next-line
  }, []);

  const getLoggedInUserId = () => {
    const loadedToken = localStorage.getItem('token');
    if (loadedToken === null) { return null }

    const decoded = jwt_decode(loadedToken)
    return decoded.userId
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<RegistrationPage />} />
        <Route path='/profile' element={
          <Profile profileData={user} getLoggedInUserId={getLoggedInUserId} user={user} setUser={setUser} />
        } />
        <Route element={<AuthenticateUser />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/enrolment" element={<EnrolmentPage />} />
          <Route path="/profile" element={<Profile profileData={user} />} />
        </Route>
      </Routes>
    </div>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem("token");
  return !(loadedToken === "");
}

export default App;

const AuthenticateUser = ({ children, redirectPath = "/" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Header companyName={`Cohort Manager 2.0`} />;
};
