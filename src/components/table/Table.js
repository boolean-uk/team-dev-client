import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
//import client from '../../utils/client';


export default function BasicTable(props) {
    const { cohortStudents } = props
    return (
        <TableContainer component={Paper} sx={{
            maxWidth: 720
        }} >
            <Table aria-label="simple table">
                <TableHead sx={{
                    backgroundColor: "#808080fc"
                }}>
                    <TableRow>
                        <TableCell >Student ID</TableCell>
                        <TableCell>Profile</TableCell>
                        <TableCell >FirstName</TableCell>
                        <TableCell >LastName</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >GitHub</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cohortStudents.map((row) => (
                        <TableRow key={row.user.firstName} sx={{
                            backgroundColor: "#808080fc"
                        }}>
                            <TableCell>{row.user.id}</TableCell>
                            <TableCell >
                                <Avatar>{row.user.firstName[0]} </Avatar>
                            </TableCell>
                            <TableCell >
                                {row.user.firstName}
                            </TableCell>
                            <TableCell >{row.user.lastName}</TableCell>
                            <TableCell >{row.user.email}</TableCell>
                            <TableCell >{row.user.gitHub}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
