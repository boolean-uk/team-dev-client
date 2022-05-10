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

  const searchBarStyle = { display: 'flex', justifyContent: 'center', alignContent: 'center' };

  return (
    <Box>
      <form style={searchBarStyle} className='search-form' onSubmit={handleSubmit}>
        <Box style={{ height: '30px', width: '400px' }} sx={{ backgroundColor: 'white' }}>
          <InputBase placeholder='Enter The Student Name' inputProps={{ 'aria-label': 'search' }} />
        </Box>
        <Button style={{ height: '30px' }} variant='contained' type='submit'>
          Search
        </Button>
      </form>
    </Box>
  );
}
