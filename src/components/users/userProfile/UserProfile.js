import React from "react";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";
import Header from "../../Header/Header";

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
      client
        .get(`/user/${id}`)
        .then((res) => {
          setProfile(res.data.data.user);
        })
        .catch((err) => console.log(err.response));
  }, []);

  return (
    <div>
      <Header/>
      <h1>User Profile</h1>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.biography}</p>
      <p>Github: {profile.githubUrl}</p>
    </div>
  );
};

export default UserProfile;
