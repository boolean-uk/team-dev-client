import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../Header/Header";
import client from "../../utils/client";
import { useContext } from "react";
import { loggedInUserContext } from "../../Helper/loggedInUserContext";

const EditProfile = () => {
  const { loggedInUser, setLoggedInUser } = useContext(loggedInUserContext);
  const handleSubmit = (event) => {
    event.preventDefault();

    client
      .patch(`/user/update/${loggedInUser.id}`, loggedInUser, false)
      .then((res) => setLoggedInUser(res.data))
      .catch((err) => console.log(err.response));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setLoggedInUser({
      ...loggedInUser,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <form className="user-form" onSubmit={handleSubmit}>
        <TextField
          className="user-form-input"
          label="First Name"
          variant="outlined"
          name="first_name"
          value={loggedInUser.first_name}
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          label="Last Name"
          variant="outlined"
          name="last_name"
          value={loggedInUser.last_name}
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          value={loggedInUser.email}
          onChange={handleChange}
        />

        <TextField
          className="user-form-input"
          label="Bio"
          variant="outlined"
          name="biography"
          value={loggedInUser.biography}
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="url"
          label="GitHub URL"
          variant="outlined"
          name="github_url"
          value={loggedInUser.github_url}
          onChange={handleChange}
        />
        <Button id="user-submit-button" type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditProfile;
