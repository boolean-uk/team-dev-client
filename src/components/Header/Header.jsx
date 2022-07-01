import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext, useState } from 'react';
import client from '../../utils/client';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';

const Header = ({ companyName }) => {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [msgIsDisplayed, setMsgIsDisplayed] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  let navigate = useNavigate();

  const displayMsgTwoSecs = () => {
    setMsgIsDisplayed(true);

    setTimeout(() => setMsgIsDisplayed(false), 2000);
  };

  const addCohort = (event) => {
    event.preventDefault();
    client
      .post('/cohort', {})
      .then((res) => {
        setResponseMsg(res.data.status);
        displayMsgTwoSecs();
      })
      .catch((err) => console.error(err.response));
  };

  const onGotoDeliveryLogsPageRequested = () => {
    navigate('../log');
  };

  const signOut = (event) => {
  event.preventDefault();
  localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
  localStorage.removeItem('loggedInUser')
  navigate('../', { replace: true });
 };

  return (
    loggedInUser && (
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
            <Typography>
              <span>{companyName}</span>
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <SearchBar/>
          </Box>

          <Box>
            <Stack spacing={2} direction='row'>
              <Link to='/home'>
                <Button variant='contained'>Home</Button>
              </Link>

              <Link to={`/profile/${loggedInUser.id}`}>
                <Button variant='contained'>Profile</Button>
              </Link>

              {msgIsDisplayed && <p>{responseMsg}</p>}
              {loggedInUser?.role === 'TEACHER' && 
                <>
                  <Button variant='contained' onClick={onGotoDeliveryLogsPageRequested }>Delivery Logs</Button>
                  <Button variant='contained' onClick={addCohort}>Add Cohort</Button>
                </>
              }
              <Button variant='contained' id='user-signout-button' onClick={signOut}>Logout</Button>
            </Stack>
          </Box>
        </Box>
      </>
    )
  );
};

export default Header;