import { Box } from '@mui/system';
import { Button, Stack, Typography } from '@mui/material';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import '../Header/header.css'

const Header = ({ companyName }) => {
  const { loggedInUser } = useContext(loggedInUserContext);
  let navigate = useNavigate();

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
						<SearchBar />
					</Box>

          <Box>
            <Stack spacing={2} direction='row'>
              <Link to='/home'>
                <Button variant='contained'>Home</Button>
              </Link>

              <Link to={`/profile/${loggedInUser.id}`}>
                <Button variant='contained'>Profile</Button>
              </Link>

              {loggedInUser?.role === 'TEACHER' && 
                <>
                  <Button as={Link} to='/log'variant='contained'>Delivery Logs</Button>
                  <Button as={Link} to='/cohorts/new' variant='contained'>Add Cohort</Button>
                  <Button as={Link} to='/exercises' variant='contained'>Exercises</Button>
                </>
              }
              <Button className='signout-button' variant='contained' id='user-signout-button' onClick={signOut}>Logout</Button>
              <div>
               <img  className='head-img-profile' alt="profile pic" src={loggedInUser.profile_url}/>
              </div>
			  
            </Stack>
          </Box>
        </Box>
      </>
    )
  );
};

export default Header;
