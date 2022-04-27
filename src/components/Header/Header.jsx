import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const Header = ({ companyName }) => {

  const addCohortHandle = () => {
    const options = {
      method: "POST",
      headers: {
        authorization:
          "Bearer " + localStorage.getItem(process.env.REACT_APP_USER_TOKEN), 
      },
    };
    fetch(process.env.REACT_APP_API_URL + "/cohort", options)
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
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
            <Button variant="contained" onClick={addCohortHandle}>
              Add Cohort
            </Button>
            <Button variant="contained">Logout</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
