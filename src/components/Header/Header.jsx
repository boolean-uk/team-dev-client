import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import ProfileImg from '../ProfileImg/ProfileImg'
import { Stack } from '@mui/material';
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
			<Box className='main-container-header'>
				<div className='header-logo'>
					<Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
						<h1>Cohort Manager 2.0</h1>
					</Link>
				</div>
				<div className='header-search-bar'>
					<SearchComponent setSearchInput={setSearchInput} />
				</div>
				<Box className='header-right-buttons'>
					<Stack spacing={2} direction='row'>
						{role !== 'STUDENT' && (
							<Button variant='contained'>
								<Link style={LinkStyle} to='/add-cohort'>
									Add Cohort
								</Link>
							</Button>
						)}
						<Button
							id='my-profile'
							variant='contained'
							onClick={handleMyProfileLink}>
							My Profile
						</Button>
						<Button
							id='user-signout-button'
							variant='contained'
							onClick={signOut}>
							Logout
						</Button>
						<ProfileImg />
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default Header;
