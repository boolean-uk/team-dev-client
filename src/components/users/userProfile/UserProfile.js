import React from "react";
import { Link } from 'react-router-dom';
import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const initialProfileState = {
    first_name: "",
    last_name: "",
    email: "",
    biography: "",
    github_url: "",
  };
  const [profile, setProfile] = useState(initialProfileState);
  const { id } = useParams();

  useEffect(() => {
      handleFindProfile()
  })

  const handleFindProfile = () => {
    client.get(`/user/${id}`)
    .then(res => {
        setProfile(res.data.data.user)
    })
    .catch(err => console.log(err.response))
  };


  return (
    <div>
      <h1>User Profile</h1>
      <h2>
        {profile.first_name} {profile.last_name}
      </h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.biography}</p>
      <p>Github: {profile.github_url}</p>
      <Link id='edit-profile-button' to={`/user/edit/${id}`}> Edit Profile
      </Link>
    </div>
  );
};


export default UserProfile;
