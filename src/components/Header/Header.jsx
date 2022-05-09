import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import SearchComponent from '../search/SearchComponent'
import client from '../../utils/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = ({ setSearchInput }) => {
  let navigate = useNavigate();
  const location = useLocation();
  const [buttonDisplay, setButtonDisplay] = useState();

  const role = localStorage.getItem('role');

  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    localStorage.setItem('role', '');
    navigate('../login', { replace: true });
  };

  const addCohortHandle = () => {
    client.post('/cohort', {}).catch((err) => console.log(err.response));
  };

  const handleMyProfileLink = () => {
    const userId = localStorage.getItem('userId');
    navigate(`../user/${userId}`);
  };

  useEffect(() => {
    if (location.pathname.includes('/cohort') && role === 'STUDENT') {
      setButtonDisplay({ display: 'none' });
    }
  }, [location, role]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'grey',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100vw',
          padding: '1em',
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} variant='p' component='p'>
            Cohort Manager 2.0
          </Typography>
        </Box>

        <SearchComponent setSearchInput={setSearchInput} />

        <Box>
          <Stack spacing={2} direction='row'>
            <Button
              variant='contained'
              onClick={addCohortHandle}
              style={buttonDisplay}
            >
              Add Cohort
            </Button>
            <Button
              id='my-profile'
              variant='contained'
              onClick={handleMyProfileLink}
            >
              My Profile
            </Button>
            <Button
              id='user-signout-button'
              variant='contained'
              onClick={signOut}
            >
              Logout
            </Button>
            <Avatar />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;