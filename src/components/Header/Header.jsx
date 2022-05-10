import React from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import SearchComponent from "../search/SearchComponent";
import client from "../../utils/client";
import { useNavigate } from "react-router-dom";
import storage from "../../utils/storage";
import { Link } from "react-router-dom";

const Header = ({ setSearchInput, role, userId}) => {

  let navigate = useNavigate();
  const signOut = (event) => {
    event.preventDefault();
    storage.clearStorage();
    navigate("../login", { replace: true });
  };

  const handleMyProfileLink = () => {
    navigate(`../user/${userId}`);
  };

  const addCohortBtn = { color: "white", textDecoration: "none" };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "grey",
          justifyContent: "space-between",
          alignContent: "center",
          width: "100vw",
          padding: "1em",
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: "bold" }} variant="p" component="p">
            Cohort Manager 2.0
          </Typography>
        </Box>

        <SearchComponent setSearchInput={setSearchInput} />

        <Box>
          <Stack spacing={2} direction="row">
            {role !== "STUDENT" && (
              <Button variant="contained">
                <Link to="/add-cohort" style={addCohortBtn}>
                  Add Cohort
                </Link>
              </Button>
            )}
            <Button
              id="my-profile"
              variant="contained"
              onClick={handleMyProfileLink}
            >
              My Profile
            </Button>
            <Button
              id="user-signout-button"
              variant="contained"
              onClick={signOut}
            >
              Logout
            </Button>
            <Avatar />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
