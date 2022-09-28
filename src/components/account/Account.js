import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { useLoggedInUser } from '../../context/LoggedInUser';
import { useLocation } from 'react-router-dom';
import ChangeUserRole from '../admin/ChangeUserRole';

function createData(key, value) {
  return { key, value };
}

const Account = () => {
  const [updateEmailError, setUpdateEmailError] = useState(false);
  const [successEmailUpdate, setSuccessEmailUpdate] = useState(false);
  const [user, setUser] = useState({});
  const loggedInUser = useLoggedInUser().user;
  const location = useLocation();
  const isAdmin = loggedInUser.role === 'TEACHER';
  const isOwner = loggedInUser.id === user.id;
  

  useEffect(() => {
    if (location?.state?.user) {
      setUser(location.state.user);
    } else {
      setUser(loggedInUser);
    }
  }, [loggedInUser, location]);

  const handleUpdate = newEmail => {
    const reqBody = { email: newEmail };
    const userId = user.id;
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
      {updateEmailError && (
        <Alert severity="error">New email is the same as current</Alert>
      )}
      {successEmailUpdate && (
        <Alert severity="success">Email changed successfully</Alert>
      )}
      <div className="edit_details__">
        {isAdmin && (
          <div>
            <ChangeUserRole />
          </div>
        )}
        <>
          {isAdmin & isOwner ? (
            <EditDetails handleUpdate={handleUpdate} />
          ) : (
            <></>
          )}
        </>
      </div>
    </>
  );
};

export default Account;
