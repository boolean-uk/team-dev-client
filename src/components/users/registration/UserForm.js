import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import React from "react"
import { useState } from "react"

const UserForm = ({ handleSubmit, handleChange }) => {
  const [radioButtonValue, setRadioButtonValue] = useState(null)

  function handleFilter(event) {
    const inputValue = event.target.value
    console.log(inputValue)
    setRadioButtonValue(inputValue)
  }

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
        type="url"
        label="GitHub URL"
        variant="outlined"
        name="github_url"
        onChange={handleChange}
      />
      <label className="user-form-input-button">
        <input
          type="radio"
          value="student"
          onChange={handleFilter}
          checked={radioButtonValue === "student"}
        />
        <h4>Student</h4>
        <input
          type="radio"
          value="teacher"
          onChange={handleFilter}
          checked={radioButtonValue === "teacher"}
        />
        <h4>Teacher</h4>
      </label>
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
}

export default UserForm
