import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import React from "react"

const UserForm = ({ handleSubmit, handleChange, handleFilter, radioButtonValue, registrationError}) => {

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField
        className="user-form-input"
        label="First Name"
        variant="outlined"
        name="first_name"
        onChange={handleChange}
      />
      <TextField
        className="user-form-input"
        label="Last Name"
        variant="outlined"
        name="last_name"
        onChange={handleChange}
      />
      <TextField
        className="user-form-input"
        type="email"
        label="Email"
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
        label="Bio"
        variant="outlined"
        name="biography"
        onChange={handleChange}
      />
      <TextField
        className="user-form-input"
        label="Avatar URL"
        variant="outlined"
        name="avatar"
        onChange={handleChange}
      />
      <TextField
        className="user-form-input"
        type="url"
        label="GitHub URL"
        variant="outlined"
        name="github_url"
        onChange={handleChange}
      />
      <label className="user-form-input-button">
        <input
          type="radio"
          value="STUDENT"
          onChange={handleFilter}
          checked={radioButtonValue === "STUDENT"}
        />
        <h4>Student</h4>
        <input
          type="radio"
          value="TEACHER"
          onChange={handleFilter}
          checked={radioButtonValue === "TEACHER"}
        />
        <h4>Teacher</h4>
      </label>
      {registrationError && <p>{registrationError}</p>}
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}

export default UserForm
