import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import SearchComponent from '../search/SearchComponent';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ setSearchInput }) => {
  let navigate = useNavigate();
  const role = localStorage.getItem('role');
  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    localStorage.setItem('role', '');
    navigate('../login', { replace: true });
  };

  const handleMyProfileLink = () => {
    const userId = localStorage.getItem('userId');
    navigate(`../user/${userId}`);
  };

  const ButtonStyle = { height: '30px', color: 'white', textDecoration: 'none' };
  const LinkStyle = { color: 'white', textDecoration: 'none' };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'grey',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'baseline',
          width: '100vw',
          padding: '1em',
        }}
      >
        {/* Logo */}
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} variant='p' component='p'>
            Cohort Manager 2.0
          </Typography>
        </Box>

        {/* SearchBar */}
        <SearchComponent setSearchInput={setSearchInput} />

        <Box>
          <Stack spacing={2} direction='row'>
            {/* !!!! - change back NOT EQUAL TO STUDENT */}
            {role === 'STUDENT' && (
              <Button style={ButtonStyle} variant='contained'>
                <Link style={LinkStyle} to='/add-cohort'>
                  Add Cohort
                </Link>
              </Button>
            )}

            {/* // PROFILE BUTTON */}
            <Button
              style={ButtonStyle}
              id='my-profile'
              variant='contained'
              onClick={handleMyProfileLink}
            >
              My Profile
            </Button>

            {/* // SIGNOUT BUTTON */}
            <Button
              style={ButtonStyle}
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
