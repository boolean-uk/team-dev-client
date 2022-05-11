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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

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
      <TableContainer
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          m: 'auto',
          mt: 5,
          maxWidth: '40%',
        }}
      >
        <Table aria-label="Search Results">
        <TableHead sx={{backgroundColor: '#23232c'}} >
          <TableRow>
          <TableCell
                  sx={{
                      color: '#ffffff',
                      fontWeight: 'bold',
                      borderBlockColor: '#23232c',
                      textAlign: 'center',
                      }}
                >
                Search Results
              </TableCell>
            </TableRow>
        <TableBody sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {searchResults.map((user, key) => (
               <Link to={`/user/${user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
               <TableRow
               key={key}
               sx={{
                   backgroundColor: '#464657',
               }}
           >
             <TableCell
                   sx={{
                       color: '#ffffff',
                       borderBlockColor: '#464657',
                       textAlign: 'center',
                   }}
               >
  
                       <Avatar>
                           {user.firstName[0].toUpperCase()}
                           {user.lastName[0].toUpperCase()}
                       </Avatar>
        

               </TableCell>
               <TableCell
                   sx={{
                       color: '#ffffff',
                       borderBlockColor: '#464657',
                       textAlign: 'left',
                       width: '50%',
                   }}
               >
                   {user.firstName} {user.lastName} 
               </TableCell>
               <TableCell
                   sx={{
                       color: '#ffffff',
                       borderBlockColor: '#464657',
                       textAlign: 'center',
                       width: '100%',
                   }}
               >
                   {user.role}
               </TableCell>
              
               </TableRow>
               </Link>
            ))}
        </TableBody>
        </TableHead>
        </Table>
      </TableContainer>
    </>
  );
}


