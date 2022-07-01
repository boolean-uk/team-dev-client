import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../searchBar/SearchBar';
import '../Header/header.css'

const Header = ({ companyName }) => {
  const { loggedInUser } = useContext(loggedInUserContext);
  let navigate = useNavigate();

  const handleAddCohortClick = (event) => {
    event.preventDefault();
    navigate('../cohorts/add-cohort', { replace: true });
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
						<SearchBar />
					</Box>

					<Box>
						<Stack spacing={2} direction='row'>
							<Link to={`/profile/${loggedInUser.id} `}>
								<Button variant='contained'>Profile</Button>
							</Link>

              {loggedInUser?.role === 'TEACHER' && 
                <>
                  <Button variant='contained' onClick={onGotoDeliveryLogsPageRequested }>Delivery Logs</Button>
                  <Button variant='contained' onClick={handleAddCohortClick}>Add Cohort</Button>
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
