import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const Header = ({ companyName}) => {

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
          {/* typography component cannot have a <p> tag as a child. NEEDS FIXING*/}
          <Typography>
            <p>{companyName}</p>
          </Typography>
        </Box>

        {/* <SearchBar /> */}

        <Box>

          <Stack spacing={2} direction="row">
            <Button variant="contained">
              <NavLink to="/enrolment">Enrolment</NavLink>
            </Button>
            <Button variant="contained" href="/profile">
              Profile
            </Button>
            
            <Button variant="contained">Logout</Button>
            <Button href="/profile"><Avatar src="default.png" /></Button>
          </Stack>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default Header;
