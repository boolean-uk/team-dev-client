import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

const SearchBar = ({
  loggedInUser,
  string,
  setUserName,
  userName,
  getUserByName,
}) => {
  console.log('11.............', loggedInUser);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUserName({
      ...userName,
      [name]: value,
    });
  };
  console.log(userName);

  return (
    <>
      <Box sx={{ backgroundColor: 'white' }}>
        <InputBase
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          value={userName}
          name='searchInput'
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button onClick={''} variant='contained'>
          Search User
        </Button>
      </Box>
    </>
  );
};

export default SearchBar;
