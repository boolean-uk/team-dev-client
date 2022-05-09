import React from "react"
import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { Stack } from "@mui/material"
import InputBase from "@mui/material/InputBase"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Header = ({ role, userId }) => {
  let navigate = useNavigate()

  const signOut = (event) => {
    event.preventDefault()
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "")
    navigate("../login", { replace: true })
  }

  const handleMyProfileLink = () => {
    const userId = localStorage.getItem("userId")
    navigate(`../user/${userId}`)
  }

  const addCohortBtn = { color: "white", textDecoration: "none" }

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
  )
}

export default Header
