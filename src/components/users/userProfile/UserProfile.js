import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";
<<<<<<< HEAD
import Header from "../../Header/Header";
=======
import Header from '../../Header/Header';
>>>>>>> ff0e1fc0ba23169600ab3850eac966cd08a7eab0

const UserProfile = () => {
  const [profile, setProfile] = useState("");
  const { id } = useParams();
  let role = profile.role;

  useEffect(() => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  }, [id]);

  return (
    <div>
      <Header role={role} />
      <h1>User Profile</h1>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.biography}</p>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ff0e1fc0ba23169600ab3850eac966cd08a7eab0
      <p>Github: {profile.github_url}</p>
      <Link id="edit-profile-button" to={`/user/edit/${id}`}>
        {" "}
        Edit Profile
      </Link>
<<<<<<< HEAD
=======
=======
      <p>Github: {profile.githubUrl}</p>
>>>>>>> origin
>>>>>>> ff0e1fc0ba23169600ab3850eac966cd08a7eab0
    </div>
  );
};

export default UserProfile;
