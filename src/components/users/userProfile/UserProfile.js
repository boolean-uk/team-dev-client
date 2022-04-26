import React from "react";
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
      foundProfile()
  }, [])

  console.log(id);

  const foundProfile = () => {
    client.get(`/user/${id}`)
    .then(res => {
        setProfile(res.data.data.user)
    })
    .catch(err => console.log(err.response))
  };

  return (
    <div>
      <h2>
        {profile.first_name} {profile.last_name}
      </h2>
      <p>{profile.email}</p>
      <p>{profile.biography}</p>
      <p>{profile.github_url}</p>
    </div>
  );
};

export default UserProfile;
