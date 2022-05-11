import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import SearchComponent from '../search/SearchComponent';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './header.css';
import storage from "../../utils/storage";

const Header = ({ setSearchInput, role, userId}) => {

  let navigate = useNavigate();
  const signOut = (event) => {
    event.preventDefault();
    storage.clearStorage();
    navigate("../login", { replace: true });
  };

  const handleMyProfileLink = () => {
    navigate(`../user/${userId}`);
  };
	const LinkStyle = { color: 'white', textDecoration: 'none', justifyContent: 'flex-start' };
	const ButtonStyle = {minWidth: 130, maxHeight: 30, mr: 2}

	return (
		<>
			<Box className='main-container-header' sx={{display: 'flex', alignItems: 'center', backgroundColor: 'rgb(97, 101, 107)', minWidth: '100vw'}}>
				<Box className='header-logo' sx={{display: 'flex', alignItems: 'center', justifyItems: 'flex-start'}}>
					<Link to='/' style={LinkStyle}>
						<h1>Cohort Manager 2.0</h1>
					</Link>
				</Box>
				<Box className='header-search-bar' sx={{marginRight: 2, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
					<SearchComponent setSearchInput={setSearchInput} />
				</Box>
				<Box className='header-right-buttons' sx={{display: 'flex', alignItems: 'center'}}>
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
							onClick={handleMyProfileLink}>
							My Profile
						</Button>
						<Button
							sx={ButtonStyle}
							id='user-signout-button'
							variant='contained'
							onClick={signOut}>
							Logout
						</Button>
						<Avatar sx={{mr: 2}}/>
				</Box>
				
			</Box>
		</>
	);
};

export default Header;
