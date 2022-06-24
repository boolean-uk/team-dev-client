import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Header from "../Header/Header";

const EditProfile = ({ currentUser, setCurrentUser }) => {
  const handleSubmit = () => {};

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setCurrentUser({
      ...currentUser,
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
          value={currentUser.first_name}
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          label="Last Name"
          variant="outlined"
          name="last_name"
          value={currentUser.last_name}
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="email"
          label="Email"
          variant="outlined"
          name="email"
          value={currentUser.email}
          onChange={handleChange}
        />

        <TextField
          className="user-form-input"
          label="Bio"
          variant="outlined"
          name="biography"
          value={currentUser.biography}
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="url"
          label="GitHub URL"
          variant="outlined"
          name="github_url"
          value={currentUser.first_name}
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
