import { Box } from "@mui/system"
import Button from "@mui/material/Button"
import InputBase from "@mui/material/InputBase"
import { useState } from "react"
import client from "../../utils/client";
// import { useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography';


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

export default function SearchComponent() {

  // let navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (event) => {
    setSearchInput(event.target.value)
    console.log(searchInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("HandleSubmit pressed")
    console.log(`/user?first_name=${searchInput}`)
    client
      .get(`/user?first_name=${searchInput}`)
      .then((res) => setSearchResults(res.data))
      // .then(navigate('/search'))
      .catch(err => console.log(err.response))
    }

    // console.log(searchResults)
  


    
  

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}
    >
      <form className="search-form" onSubmit={handleSubmit}>
        <Box sx={{ backgroundColor: "white" }}>
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
            value={searchInput}
          />
        </Box>
        <Box>
          <Button variant="contained" type="submit" >Search User</Button>
        </Box>
      </form>
      <Typography>{searchResults}</Typography>
    </Box>
  )
}
