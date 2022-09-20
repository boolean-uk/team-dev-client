import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Header from '../Header/Header';
import './style.css';
import EditDetails from './EditDetails';

function createData(key, value) {
  return { key, value };
}

const Account = ({ user }) => {
  const info = Object.entries(user);
  const rows = info.map(([key, val]) => createData(key, val));

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
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
      <EditDetails user={user} />
    </>
  );
};

export default Account;
