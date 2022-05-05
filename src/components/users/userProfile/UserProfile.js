import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import "./style.css";

const UserProfile = () => {
  const [profile, setProfile] = useState("");
  const { id } = useParams();
  const loggedInId = localStorage.getItem("userId");
  let role = profile.role;

  useEffect(() => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
    handleRenderEditUser();
  }, [id]);

  const handleRenderEditUser = () => {
    // we wanna get the user id from params of the page we are currently viewing
    // get the user id of person logged in from user storage
    // if the same id then disply edit profile link
    // else DONT DO IT
    console.log("this is the id of the page we are viewing", id);
    console.log("this is the local storage id", localStorage.getItem("userId"));
    if (id !== loggedInId) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <Header role={role} />
      <h1>User Profile</h1>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.biography}</p>
      <p>Github: {profile.github_url}</p>
      <Link id='edit-profile-button' to={`/user/edit/${id}`} className='link'>
        Edit Profile
      </Link>
    </div>
  );
};

export default UserProfile;
