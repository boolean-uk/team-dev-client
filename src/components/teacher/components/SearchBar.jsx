import client from '../../../utils/client';
import {
  Dialog,
  TextField, Button
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function SearchBar() {
  const [open, setOpen] = useState(false)
  const [inputText, setInputText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  let navigate = useNavigate();

  // handle the text input to search bar
  const handleChange = event => {
    event.preventDefault();
    const value = event.target.value;

    setInputText(value);

  };

  // handle onclick of button
  const submitSearch = () => {
    setOpen(true)
    client
      .get(`/users?firstName=${inputText}`)
      .then(res => {
        const users = res.data.data.users;

        setSearchResult(users);
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
      <TextField
        variant='outlined'
        label='Search..'
        value={inputText}
        onChange={handleChange}
      />
      <Button
        variant='contained'
        onClick={submitSearch}>
        Search
      </Button>
      <Dialog>
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
      </Dialog>
    </div>
  );
}

export default SearchBar;

// searchResult.map((user, i) => {
//   return (
//     <ListItem key={i}>
//       <ListItemAvatar>
//         <Avatar
//           src={user.profile.profileImageUrl}
//           alt={user.profile.firstName}
//         />
//       </ListItemAvatar>
//       <ListItemText
//         primary={`${user.profile.firstName} ${user.profile.lastName}`}
//       />
//     </ListItem>
//   );
// })