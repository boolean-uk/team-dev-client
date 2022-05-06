import React from 'react';
import { useEffect, useState } from 'react';
import client from '../../utils/client';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

export default function SearchPage({ searchInput }) {
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchInput) {
      return;
    }
    client
      .get(`/user?first_name=${searchInput}`)
      .then((res) => {
        setSearchResults(res.data.data.users);
      })
      .catch((err) => console.log('Error', err));
  }, [searchInput]);


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          mt: 5,
        }}
      >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {searchResults.map((user) => (
            <>
              <ListItem key={user.id}>
                <ListItemButton
                  component='a'
                  onClick={() => navigate(`../user/${user.id}`)}
                  color='white'
                  variant='contained'
                >
                  <ListItemText
                    sx={{ color: 'black' }}
                    display='block'
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`${user.role}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </>
  );
}