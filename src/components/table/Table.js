import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
//import client from '../../utils/client';


export default function BasicTable(props) {

console.log('passing', props.cohortStudents)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student ID</TableCell>
                        <TableCell >FirstName</TableCell>
                        <TableCell >LastName</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell >GitHub</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cohortStudents.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >{row.firstName}</TableCell>
                            <TableCell >{row.lastName}</TableCell>
                            <TableCell >{row.email}</TableCell>
                            <TableCell >{row.gitHub}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
