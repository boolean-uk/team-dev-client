import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import client from '../../../utils/client';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

function SearchBar() {
  const [inputText, setInputText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchResponse, setSearchResponse] = useState('');

  let navigate = useNavigate();

  // handle the text input to search bar
  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setInputText({
      value,
    });
    console.log('search input', inputText);
  };

  // handle onclick of button
  const submitSearch = () => {
    client
      .get(`/users`)
      .then(res => {
        setSearchResponse(res.data);

        const users = res.data.data.users;
        console.log('users:', users);
        console.log('input:', inputText);

        const foundUser = users.filter(user =>
          user.first_name.toLowerCase().includes(inputText.value.toLowerCase())
        );

        console.log('found', foundUser);

        setSearchResult(foundUser);
      })

      .catch(err => console.log(err.response));
  };

  const routeChange = id => {
    localStorage.setItem('id', id);
    console.log('routing', id);
    let path = `/user/${id}/profile`;
    navigate(path);
  };

  return (
    <div className='search__container'>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          border: '1px solid black',
          borderRadius: '0.3rem',
          marginLeft: '1rem'
        }}
      >
        <Box sx={{ backgroundColor: 'white' }}>
          <InputBase
            onChange={handleChange}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <Box>
          <Button onClick={submitSearch} variant="contained">
            Search User
          </Button>
        </Box>
      </Box>
      <Box>
        <ul>
          {searchResult.map((user, index) => {
            return (
              <li key={index}>
                {user.first_name} {''}
                {user.last_name} {''}
                <Button onClick={() => routeChange(user.id)}>Profile</Button>
              </li>
            );
          })}
        </ul>
      </Box>
    </div>
  );
}

export default SearchBar;
