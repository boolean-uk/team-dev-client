import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

const UserForm = ({ handleSubmit, handleChange }) => {
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
        type="url"
        label="Profile Picture URL"
        variant="outlined"
        name="profile_picture_url"
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
      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
      <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
      <RadioGroup
        onChange={handleChange}
        row
        aria-labelledby="role"
        name="role"
      >
        <FormControlLabel value="TEACHER" control={<Radio />} label="Teacher" />
        <FormControlLabel value="STUDENT" control={<Radio />} label="Student" />
      </RadioGroup>

      <Button id="user-submit-button" type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
