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
import PrivacyMenu from './PrivacyMenu';

function createData(key, value) {
  return { key, value };
}

const Account = () => {
  const [successEmailUpdate, setSuccessEmailUpdate] = useState(false);
  const [errorEmailUpdate, setErrorEmailUpdate] = useState(false);
  const [successPrefUpdate, setSuccessPrefUpdate] = useState(false);
  const [errorPrefUpdate, setErrorPrefUpdate] = useState(false);
  const [user, setUser] = useState({});
  const loggedInUser = useLoggedInUser().user;
  const location = useLocation();
  const isAdmin = loggedInUser.role === 'ADMIN';
  const isOwner = loggedInUser.id === user.id;

  useEffect(() => {
    if (location?.state?.user) {
      setUser(location.state.user);
    } else {
      setUser(loggedInUser);
    }
  }, [loggedInUser, location]);

  const handleEmailUpdate = reqData => {
    const reqBody = { email: reqData };

    const userId = user.id;
    if (userId === null) {
      return;
    }

    client
      .patch(`/user/${user.id}`, reqBody)
      .then(res => {
        setUser(res.data.data.user);
        setSuccessEmailUpdate(true);
        setTimeout(() => {
          setSuccessEmailUpdate(false);
        }, '3000');
      })

      .catch(err => {
        console.error(err.response);
        setErrorEmailUpdate(true);
        setTimeout(() => {
          setErrorEmailUpdate(false);
        }, '3000');
      });
  };

  const handlePrivacyUpdate = reqData => {
    const reqBody = { postPrivacyPref: reqData };
    const userId = user.id;
    if (userId === null) {
      return;
    }

    client
      .patch(`/user/${user.id}/privacy`, reqBody)
      .then(res => {
        setUser(res.data.data.user);
        setSuccessPrefUpdate(true);
        setTimeout(() => {
          setSuccessPrefUpdate(false);
        }, '3000');
      })

      .catch(err => {
        console.error(err.response);
        setErrorPrefUpdate(true);
        setTimeout(() => {
          setErrorPrefUpdate(false);
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
                {row.key === 'postPrivacyPref' ? (
                  <TableCell component="th" scope="row">
                    Post Visibility Preference
                  </TableCell>
                ) : (
                  <TableCell component="th" scope="row">
                    {row.key}
                  </TableCell>
                )}
                {(isOwner || isAdmin) && row.key === 'postPrivacyPref' ? (
                  <TableCell align="right" sx={{ float: 'right' }}>
                    <PrivacyMenu
                      user={user}
                      handleUpdate={handlePrivacyUpdate}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="right">{row.value}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {errorEmailUpdate && (
        <Alert
          sx={{ maxWidth: 'fit-content', margin: 'auto' }}
          severity="error"
        >
          That email address is already registered
        </Alert>
      )}
      {successEmailUpdate && (
        <Alert
          sx={{ maxWidth: 'fit-content', margin: 'auto' }}
          severity="success"
        >
          Email changed successfully
        </Alert>
      )}
      {errorPrefUpdate && (
        <Alert
          sx={{ maxWidth: 'fit-content', margin: 'auto' }}
          severity="error"
        >
          Your post privacy has not been updated
        </Alert>
      )}
      {successPrefUpdate && (
        <Alert
          sx={{ maxWidth: 'fit-content', margin: 'auto' }}
          severity="success"
        >
          Your post privacy has been updated
        </Alert>
      )}
      <div className="btns__container">
        {isAdmin && !isOwner ? (
          <div>
            <ChangeUserRole setUser={setUser} user={user} />
          </div>
        ) : (
          <></>
        )}
        <>
          {isOwner ? <EditDetails handleUpdate={handleEmailUpdate} /> : <></>}
        </>
      </div>
    </>
  );
};

export default Account;
