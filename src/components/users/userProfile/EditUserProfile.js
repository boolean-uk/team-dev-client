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
  });

  console.log(id);

  const handleFindProfile = () => {
    client
      .get(`/user/${id}`)
      .then((res) => {
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  };

  function handleEditChange(event) {
    const firstName = event.target.first_name;
    const lastName = event.target.first_name;
    const email = event.target.email;
    const password = event.target.password;
    const biography = event.target.biography;
    const githubUrl = event.target.github_url;
    const value = event.target.value;

    setProfile({
      ...profile,
      [firstName]: value,
      [lastName]: value,
      [email]: value,
      [password]: value,
      [biography]: value,
      [githubUrl]: value,
    });
  }

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
        password: profile.password,
        biography: profile.biography,
        github_url: profile.github_url,
      }),
    };
    fetch(`/users/${id}`, options)
      .then((res) => {
        console.log(res)
        setProfile(res.data.data.user);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <h1> Edit Profile Details </h1>
      <form onSubmit={onSubmit} className="user-form">
        <TextField
          className="user-form-input"
          value={profile.first_name}
          variant="outlined"
          name="first_name"
          onChange={handleEditChange}
        />
        <TextField
          className="user-form-input"
          value={profile.last_name}
          variant="outlined"
          name="last_name"
          onChange={handleEditChange}
        />
        <TextField
          className="user-form-input"
          type="email"
          value={profile.email}
          variant="outlined"
          name="email"
          onChange={handleEditChange}
        />
        <TextField
          className="user-form-input"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleEditChange}
        />
        <TextField
          className="user-form-input"
          value={profile.biography}
          variant="outlined"
          name="biography"
          onChange={handleEditChange}
        />
        <TextField
          className="user-form-input"
          type="url"
          value={profile.github_url}
          variant="outlined"
          name="github_url"
          onChange={handleEditChange}
        />
        <Button id="user-submit-button" type="submit" variant="contained">
          Submit
        </Button>
      </form>
      (console.log; is it working ? )
    </div>
  );
};

export default UserForm;
