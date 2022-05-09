import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';


export default function SearchComponent({ setSearchInput }) {
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('HandleSubmit pressed', e);
    setSearchInput(e.target[0].value);
    navigate('/search');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
      <form className='search-form' onSubmit={handleSubmit}>
        <Box sx={{ backgroundColor: 'white' }}>
          <InputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
        </Box>
        <Box>
          <Button variant='contained' type='submit'>
            Search User
          </Button>
        </Box>
      </form>
    </Box>
  );
}
