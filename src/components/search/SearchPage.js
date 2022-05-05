import React from 'react';
import { useEffect, useState } from 'react';
import client from '../../utils/client';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function SearchPage({ searchInput }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchInput) {
      return;
    }
    client
      .get(`/user?first_name=${searchInput}`)
      .then((res) => {
        console.log('go results:', res);
        setSearchResults(res.data.data.users);
      })
      .catch((err) => console.log('Error', err));
    console.log('Search page', searchInput);
  }, [searchInput]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <List>
          {searchResults.map((user) => (
            <>
              <ListItem colour="white" key={user.id}>
                <ListItemButton  component='a' href='#simple-list' color="white" variant="contained">
                  <ListItemText primary={`${user.firstName} ${user.lastName}`} />
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
