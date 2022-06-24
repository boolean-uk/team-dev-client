import { React, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Header from "../Header/Header";
import client from "../../utils/client";

const Profile = () => {
  const params = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    client
      .get(`/user/${params.id}`)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.log(err.response));
  }, [params]);

  return (
    <>
      <Header />
      <div className="user-form">
        <TextField
          className="user-form-input"
          variant="outlined"
          value={userData.first_name}
        />
        <TextField
          className="user-form-input"
          variant="outlined"
          value={userData.last_name}
        />
        <TextField
          className="user-form-input"
          type="email"
          variant="outlined"
          value={userData.email}
        />

        <TextField
          className="user-form-input"
          variant="outlined"
          value={userData.biography}
        />
        <TextField
          className="user-form-input"
          type="url"
          variant="outlined"
          value={userData.github_url}
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
