import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './style.css';
import EditDetails from './EditDetails';
import client from '../../utils/client';
import { Alert } from '@mui/material';

function createData(key, value) {
  return { key, value };
}

const Account = ({ getLoggedInUserId, user, setUser }) => {
  const [updateEmailError, setUpdateEmailError] = useState(false);
  const [successEmailUpdate, setSuccessEmailUpdate] = useState(false);

  const { email } = user;

  const handleSubmit = event => {
    event.preventDefault();
    const reqBody = { email };

    const userId = getLoggedInUserId();
    if (userId === null) {
      return;
    }

    client
      .patch('/user/myprofile', reqBody)
      .then(res => {
        setUser(res.data.data.user);
        setSuccessEmailUpdate(true);
        setTimeout(() => {
          setSuccessEmailUpdate(false);
        }, '3000');
      })

      .catch(err => {
        console.error(err.response);
        setUpdateEmailError(true);

        setTimeout(() => {
          setUpdateEmailError(false);
        }, '3000');
      });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const info = Object.entries(user);
  const rows = info.map(([key, val]) => createData(key, val));

  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <h1>Account Information</h1>
        <Table sx={{ minWidth: 300, maxWidth: 700 }} aria-label="simple table">
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditDetails
        user={user}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {updateEmailError && (
        <Alert sx={{ maxWidth: '40%', margin: 'auto' }} severity="error">
          That email address is already registered
        </Alert>
      )}

      {successEmailUpdate && (
        <Alert sx={{ maxWidth: '40%', margin: 'auto' }} severity="success">
          Email changed successfully
        </Alert>
      )}
    </>
  );
};

export default Account;
