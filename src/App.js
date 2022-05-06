import React from 'react';
import "./App.css";
import LoginPage from "./components/users/login/LoginPage";
import RegistrationPage from "./components/users/registration/RegistrationPage";
import PostsPage from "./components/posts/PostsPage";
import EditUser from "./components/users/userProfile/EditUserProfile";
import ProfilePage from "./components/users/userProfile/UserProfile";
import ViewCohort from "./components/users/viewCohorts/viewCohorts"
import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchPage from "./components/search/SearchPage";

function App() {
  const [role, setRole] = useState("");
  const [searchInput, setSearchInput] = useState('')

 
  return (
    <div className="App">
     <Header role={role} setSearchInput={setSearchInput}/>
      <Routes>
        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/" element={<PostsPage role={role} />} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/cohort/:id" element={<ViewCohort />} />
          <Route path="/search" element={<SearchPage searchInput={searchInput} />} /> 
        </Route>
      </Routes>
    </div>
  );
}

function isLoggedIn() {
  const loadedToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
  return !(loadedToken === "" || loadedToken === null);
}

export default App;

const AuthenticateUser = ({ children, redirectPath = "/login" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
