import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ProfileLink from './ProfileLink';

export default function TableRows({ row }) {
    const rowStyle = {
        color: '#ffffff',
        borderBlockColor: '#464657',
        textAlign: 'left'
    };
    const rowBackground = {
        backgroundColor: '#464657',
    };
    return (<TableRow
        sx={rowBackground}>
        <TableCell sx={{
            color: '#ffffff',
            borderBlockColor: '#464657',
            textAlign: 'left',
            pl: 5
        }} >
            {row.user.id}
        </TableCell>
        <TableCell sx={rowStyle} >
            <ProfileLink person={row} />
        </TableCell>
        <TableCell sx={rowStyle} >
            {row.user.firstName}
        </TableCell>
        <TableCell sx={rowStyle} >
            {row.user.lastName}
        </TableCell>
        <TableCell sx={rowStyle} >
            {row.user.email}
        </TableCell>
        <TableCell sx={rowStyle} >
            {row.user.githubUrl}
        </TableCell>
    </TableRow>
    );
};
