import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import SearchComponent from '../search/SearchComponent';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import storage from '../../utils/storage';

const Header = ({ setSearchInput, role, userId }) => {
  let navigate = useNavigate();

  const signOut = (event) => {
    event.preventDefault();
    storage.clearStorage();
    navigate('../login', { replace: true });
  };

  const handleMyProfileLink = () => {
    navigate(`../user/${userId}`);
  };
  const LinkStyle = { color: 'white', textDecoration: 'none' };
  const ButtonStyle = { minWidth: 130, maxHeight: 30 };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgb(97, 101, 107)',
          minWidth: '99.1vw',
          padding: '7px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyItems: 'flex-start',
            fontSize: '1.5rem',
			      fontWeight: 'bold',
            margin: 2,
          }}
        >
          <Link to='/' style={LinkStyle}>
            Cohort Manager 2.0
          </Link>
        </Box>
        <Box sx={{ marginRight: 2 }}>
          <SearchComponent setSearchInput={setSearchInput} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'flex-end',
            mr: 2
          }}
        >
          {role !== 'STUDENT' && (
            <Button variant='contained' sx={ButtonStyle}>
              <Link style={LinkStyle} to='/add-cohort'>
                Add Cohort
              </Link>
            </Button>
          )}
          <Button
            sx={ButtonStyle}
            id='my-profile'
            variant='contained'
            onClick={handleMyProfileLink}
          >
            My Profile
          </Button>
          <Button
            sx={ButtonStyle}
            id='user-signout-button'
            variant='contained'
            onClick={signOut}
          >
            Logout
          </Button>
        </Box>
        <Avatar sx={{ mr: 2 }} />
      </Box>
    </>
  );
};

export default Header;
