import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ProfileLink from './ProfileLink';

export default function TableRows({ row, key }) {
    const rowStyle = {
        color: '#ffffff',
        borderBlockColor: '#464657',
        textAlign: 'center',
    };
    const rowBackground = {
        backgroundColor: '#464657',
    };
    return (<TableRow
        key={key}
        sx={rowBackground}>
        <TableCell sx={rowStyle} >
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
