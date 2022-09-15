import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { NavLink, Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const Header = ({ companyName }) => {
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box sx={{ backgroundColor: "white" }}>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
          <Box>
            <Button variant="contained">Search User</Button>
          </Box>
        </Box>

        <Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained">
              <NavLink to="/enrolment">Enrolment</NavLink>
            </Button>
            <Button variant="contained" href="/profile">
              Profile
            </Button>
            <Button variant="contained">Add Cohort</Button>
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
