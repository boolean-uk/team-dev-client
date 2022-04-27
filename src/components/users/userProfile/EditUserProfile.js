import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";

const UserForm = () => {

  const [profile, setProfile] = useState("");
  const { id } = useParams();

  useEffect(() => {
    handleFindProfile();
  }, []);

  console.log(id);

  const handleFindProfile = () => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  };

  const onFirstNameChange = (e) => {
    setProfile({ ...profile, first_name: e.target.value });
  };
  const onLastNameChange = (e) => {
    setProfile({ ...profile, last_name: e.target.value });
  };
  const onEmailChange = (e) => {
    setProfile({ ...profile, email: e.target.value });
  };
  const onPasswordChange = (e) => {
    setProfile({ ...profile, password: e.target.value });
  };
  const onBiographyChange = (e) => {
    setProfile({ ...profile, biography: e.target.value });
  };

  const onGithubUrlChange = (e) => {
    setProfile({ ...profile, github_url: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_Name: profile.first_name,
        last_Name: profile.last_name,
        email: profile.email,
        biography: profile.biography,
        github_url: profile.github_url,
      }),
    };
    fetch(`/users/${id}`, options)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <h1> Edit Profile Details </h1>
      <br></br>
      <form onSubmit={onSubmit} className="user-form">
        <TextField
          className="user-form-input"
          value={profile.first_name}
          variant="outlined"
          name="first_name"
          onChange={onFirstNameChange}
        />
        <TextField
          className="user-form-input"
          value={profile.last_name}
          variant="outlined"
          name="last_name"
          onChange={onLastNameChange}
        />
        <TextField
          className="user-form-input"
          type="email"
          value={profile.email}
          variant="outlined"
          name="email"
          onChange={onEmailChange}
        />
        <TextField
          className="user-form-input"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          onChange={onPasswordChange}
        />
        <TextField
          className="user-form-input"
          value={profile.biography}
          variant="outlined"
          name="biography"
          onChange={onBiographyChange}
        />
        <TextField
          className="user-form-input"
          type="url"
          value={profile.github_url}
          variant="outlined"
          name="github_url"
          onChange={onGithubUrlChange}
        />
        <Button id="user-submit-button" type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
