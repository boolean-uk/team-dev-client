import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";

const UserForm = ({ handleSubmit, handleChange }) => {
  // when changing the password we want to type in original password and email before changing
  // we also want the option to change some fields as opposed to all

  // we need to decide as a team how we're gunna implement the above
  // initial get request to load user details,
  //use state
  // value set to state or placeholder

 
    const initialProfileState = {
      first_name: "",
      last_name: "",
      email: "",
      biography: "",
      github_url: "",
    }
    const [profile, setProfile] = useState(initialProfileState);
    const { id } = useParams();

    useEffect(() => {
      foundProfile();
    }, []);

    console.log(id);

    const foundProfile = () => {
      client
        .get(`/user/${id}`)
        .then((res) => {
          setProfile(res.data.data.user);
        })
        .catch((err) => console.log(err.response));
    };

    return (
      <form className="user-form" onSubmit={handleSubmit}>
        <TextField
          className="user-form-input"
          value= {profile.first_name}
          variant="outlined"
          name="first_name"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          value= {profile.last_name}
          variant="outlined"
          name="last_name"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="email"
          value= {profile.email}
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          value= {profile.biography}
          variant="outlined"
          name="biography"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="url"
          value= {profile.github_url}
          variant="outlined"
          name="github_url"
          onChange={handleChange}
        />
        <Button id="user-submit-button" type="submit" variant="contained">
          Submit
        </Button>
      </form>
    );
  };


export default UserForm;
