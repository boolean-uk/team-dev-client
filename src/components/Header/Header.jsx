import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import { useEffect, useState } from 'react';
import client from '../../utils/client';
import { Alert } from '@mui/material';
import { useLoggedInUser } from '../../context/LoggedInUser.jsx'

const Header = ({ companyName }) => {
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(false)
  const userLoggedIn = useLoggedInUser().user


  useEffect(() => {
    const userId = userLoggedIn.id;
    if (userId === null) {
      return;
    }
    client
      .get(`/user/${userId}`)
      .then(setAuthError(false))
      .catch(err => {
        console.error(err.response);
        setAuthError(true);

        setTimeout(() => {
          setAuthError(false);
        }, '3000');
      });
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    const userId = userLoggedIn.id;
    if (userId === null) {
      return;
    }
    client
      .get(`/user/${userId}`)
      .then(res => {
        navigate('/profile', { state: { user: userLoggedIn } })
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      {authError && (
        <Alert severity="success">This user cannot be found</Alert>
      )}
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
          <Typography fontSize={22}>
            <Link to="/posts">{companyName}</Link>
          </Typography>
        </Box>

        <Box>
          <Stack spacing={2} direction="row">
            <Button variant="contained" href="/posts">Posts</Button>
            <Button variant="contained" onClick={handleClick}>Profile</Button>
            <Button variant="contained" href="/">Logout</Button>
            <Button href="/account"><Avatar src={userLoggedIn.profile_image_url} /></Button>
          </Stack>
        </Box>
      </Box>
      <Outlet />
    </>
  );
};

export default Header;
