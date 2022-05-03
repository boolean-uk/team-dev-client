import "./App.css";
import LoginPage from "./components/users/login/LoginPage";
import RegistrationPage from "./components/users/registration/RegistrationPage";
import PostsPage from "./components/posts/PostsPage";
import EditUser from "./components/users/userProfile/EditUserProfile";
import ProfilePage from "./components/users/userProfile/UserProfile";
<<<<<<< HEAD
import { useState } from "react";
=======
<<<<<<< HEAD

=======
import { useState } from "react";
>>>>>>> origin
>>>>>>> ff0e1fc0ba23169600ab3850eac966cd08a7eab0
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

function App() {
  const [role, setRole] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage setRole={setRole} />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route element={<AuthenticateUser />}>
          <Route path="/" element={<PostsPage role={role}/>} />
          <Route path="/user/:id" element={<ProfilePage />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
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

const AuthenticateUser = ({ children, redirectPath = "/login" }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
