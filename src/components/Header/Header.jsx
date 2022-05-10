import React from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import SearchComponent from '../search/SearchComponent';
import ProfileImg from '../ProfileImg/ProfileImg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './header.css';

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

	const LinkStyle = { color: 'white', textDecoration: 'none' };

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
						<Avatar />
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default Header;
