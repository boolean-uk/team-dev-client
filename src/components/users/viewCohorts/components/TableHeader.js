import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableHeader() {
    const headerStyle = {
        color: '#ffffff',
        fontWeight: 'bold',
        borderBlockColor: '#23232c',
        textAlign: 'left'
    };
    const headerBackground = {
        backgroundColor: '#23232c'
    };
    return (<TableHead sx={headerBackground} >
        <TableRow>
            <TableCell sx={headerStyle} >
                Student ID
            </TableCell>
            <TableCell sx={headerStyle} >
                Profile
            </TableCell>
            <TableCell sx={headerStyle} >
                FirstName
            </TableCell>
            <TableCell sx={headerStyle} >
                LastName
            </TableCell>
            <TableCell sx={headerStyle} >
                Email
            </TableCell>
            <TableCell sx={headerStyle} >
                GitHub
            </TableCell>
        </TableRow>
    </TableHead>
    );
};