import { React } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Header from "../Header/Header";

const Profile = ({ currentUser }) => {
  console.log(currentUser.first_name);
  return (
    <>
      <Header />
      <div className="user-form">
        <TextField
          className="user-form-input"
          variant="outlined"
          value={currentUser.first_name}
        />
        <TextField
          className="user-form-input"
          variant="outlined"
          value={currentUser.last_name}
        />
        <TextField
          className="user-form-input"
          type="email"
          variant="outlined"
          value={currentUser.email}
        />

        <TextField
          className="user-form-input"
          variant="outlined"
          value={currentUser.biography}
        />
        <TextField
          className="user-form-input"
          type="url"
          variant="outlined"
          value={currentUser.github_url}
        />
        <Button id="user-submit-button" type="submit" variant="contained">
          Submit
        </Button>

        <Box>
          <Stack spacing={2} direction="row">
            <Link to="/edit-profile">
              <Button variant="contained">Edit Profile</Button>{" "}
            </Link>
          </Stack>
        </Box>
      </div>
    </>
  );
};

export default Profile;
