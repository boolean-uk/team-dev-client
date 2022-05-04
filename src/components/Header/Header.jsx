import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import SearchComponent from './SearchComponent'
import client from '../../utils/client';
import { useNavigate } from 'react-router-dom';

const Header = ({ role, setSearchInput }) => {
  let navigate = useNavigate();

  console.log("This is the role", role)

  if (!role) {
    return <></>
  }



  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
    navigate('../login', { replace: true });
  };

  const addCohortHandle = () => {
    client.post('/cohort', {}).catch((err) => console.log(err.response));
  };


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
            {role !== 'STUDENT' && (
              <Button variant='contained' onClick={addCohortHandle}>
                Add Cohort
              </Button>
            )}
            <Button id='user-signout-button' variant='contained' onClick={signOut}>
              Logout
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;

