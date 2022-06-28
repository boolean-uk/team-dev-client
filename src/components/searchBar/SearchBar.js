import { useState, useContext } from "react"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import InputBase from '@mui/material/InputBase';
import { loggedInUserContext } from "../../Helper/loggedInUserContext"


const SearchBar = ({}) => {
    
    const {setUserName, userName} = useContext(loggedInUserContext)
  
    const navigate = useNavigate()
  
    const [userDataFromInput, setUserDataFromInput] = useState()
  
    const handleChange = (event) =>{
        event.preventDefault()
        const {value, name} = event.target
        console.log("HI");
        setUserDataFromInput({
            ...userName,
            [name]: value,
        });
        console.log('welcome',userDataFromInput.searchInput);
    }
    
    const setActiveSearchUser  = () => {
        setUserName(userDataFromInput.searchInput)
        navigate('/users-list')
    }
    
  
    return(
        <>
        <Box sx={{ backgroundColor: 'white' }}>
            <InputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              value={userName.searchInput}
              name="searchInput"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <Button onClick={ () => setActiveSearchUser()}variant='contained'>Search User</Button>
          </Box>
        </>
    )
  }
  
  
  
  export default SearchBar
  