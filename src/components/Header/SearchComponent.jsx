import React from 'react';
import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import { useNavigate, Routes, Route } from "react-router-dom"



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

export default function SearchComponent({setSearchInput, searchInput}) {

  let navigate = useNavigate()
  

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("HandleSubmit pressed", e)
    setSearchInput(e.target[0].value)
    navigate("/search")
    }
    


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
          <Button variant="contained" type="submit" >Search User</Button>
        </Box>
      </form>
    </Box>
  )
}
