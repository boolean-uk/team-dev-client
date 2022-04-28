import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import client from "../../utils/client";

const Header = ({ role }) => {
  const addCohortHandle = () => {
    client.post("/cohort", {}).catch((err) => console.log(err.response));
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
            <p>Cohort Manager 2.0</p>
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
            {role !== "STUDENT" && (
              <Button variant="contained" onClick={addCohortHandle}>
                Add Cohort
              </Button>
            )}
            <Button variant="contained">Logout</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;
