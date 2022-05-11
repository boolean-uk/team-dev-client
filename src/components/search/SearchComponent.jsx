import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import '../Header/header.css'

export default function SearchComponent({ setSearchInput }) {
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('HandleSubmit pressed', e);
    setSearchInput(e.target[0].value);
    navigate('/search');
  };

  return (
    <Box >
      <form className='search-form' onSubmit={handleSubmit} style={{display: 'flex', gap: '1rem'}}>
        <Box sx={{ backgroundColor: 'white', height: '30px', width: '350px'}}>
          <InputBase placeholder='Enter The Student Name' inputProps={{ 'aria-label': 'search' }} sx={{ display: 'flex', alignItems: 'center', pl: '7px' }} />
        </Box>
        <Button style={{ height: '30px', minWidth: 130 }} variant='contained' type='submit'>
          Search
        </Button>
      </form>
    </Box>
  );
};
