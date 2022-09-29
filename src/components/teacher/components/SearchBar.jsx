import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import client from '../../../utils/client';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  let navigate = useNavigate();

  // handle the text input to search bar
  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setInputText({
      value,
    });
  };

  // handle onclick of button
  const submitSearch = () => {
    client
      .get(`/users`)
      .then(res => {
        const users = res.data.data.users;
        console.log('Users', users);

        const foundUser = users.filter(user =>
          user.first_name.toLowerCase().includes(inputText.value.toLowerCase())
        );

        setSearchResult(foundUser);
      })

      .catch(err => console.error(err.response));
  };

  const routeChange = user => {
    localStorage.setItem('id', user.id);
    let path = `/user/${user.id}/profile`;
    navigate(path, { state: { user } });
  };

  return (
    <div className="search__container">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          border: '1px solid black',
          borderRadius: '0.3rem',
          marginLeft: '1rem',
        }}
      >
        <Box sx={{ backgroundColor: 'white' }}>
          <form>
          <InputBase
            value={inputText}
            placeholder="Search…"
            onChange={handleChange}
            required
            inputProps={{ 'aria-label': 'search' }}
          />
          <Button 
            type='submit'
            onClick={submitSearch} variant="contained">
            Search User
          </Button>
          </form>
        </Box>
        <Box>
        </Box>
      </Box>
      <Box>
        <ul>
          {searchResult.map((user, index) => {
            return (
              <li key={index}>
                {user.first_name} {''}
                {user.last_name} {''}
                <Button onClick={() => routeChange(user)}>Profile</Button>
              </li>
            );
          })}
        </ul>
      </Box>
    </div>
  );
}

export default SearchBar;
