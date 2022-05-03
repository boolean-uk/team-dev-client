import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import { useEffect, useState } from "react"


/* 
TO DO:-

* Check get route is working using TC
* Work out where the component is going to live 
* Write onSubmit function that sends a GET request to the server with
  the search term in the body 
* Return the search results into state array
* Send state up to App
* Send state as props from App to Seach Component / Search Page for rendering


*/

export function SearchComponent({handleSubmit}) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <form className="search-form" onSubmit={handleSubmit}>
        <Box sx={{ backgroundColor: "white" }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
        <Box>
          <Button variant="contained">Search User</Button>
        </Box>
      </form>
    </Box>
  )
}
