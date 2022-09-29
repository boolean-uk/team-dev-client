import client from '../../../utils/client';
import {
  Dialog,
  TextField,
  Button,
  ClickAwayListener,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  DialogContent,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const enterKey = 13

  let navigate = useNavigate();

  // handle the text input to search bar
  const handleChange = event => {
    event.preventDefault();
    const value = event.target.value;

    setInputText(value);
  };

  const handleEnter = event => {
    if (event.keyCode === enterKey) {
      return submitSearch();
    }
  };

  // handle onclick of button
  const submitSearch = () => {
    setOpen(true);
    client
      .get(`/users?firstName=${inputText}`)
      .then(res => {
        const users = res.data.data.users;
        setSearchResult(users);
      })

      .catch(err => console.error(err.response));
  };

  const routeChange = (e, user) => {
    navigate('/profile', { state: { user } });
  };

  return (
    <div className="search__container">
      <TextField
        fullWidth
        variant="outlined"
        label="Search.."
        value={inputText}
        onChange={handleChange}
        onKeyUp={handleEnter}
      />
      <Button variant="contained" onClick={submitSearch}>
        Search
      </Button>
      <Dialog open={open} scroll="body">
        <DialogContent className="search__bar__dialog">
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <List sx={{ cursor: 'pointer' }} alignItems="flex-start">
              {searchResult?.map((user, i) => {
                return (
                  <>
                    <ListItem key={i} onClick={e => routeChange(e, user)}>
                      <ListItemAvatar>
                        <Avatar
                          src={user.profile_image_url}
                          alt={user.first_name}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={`${user.first_name}`} />
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          </ClickAwayListener>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchBar;
