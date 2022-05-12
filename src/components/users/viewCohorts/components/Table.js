import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHeader from './TableHeader';
import TableRows from './TableRow';

export default function BasicTable(props) {
    const { cohortStudents } = props;
    return (
        <TableContainer
            component={Paper}
            sx={{ marginLeft: 5, width: '90%', minWidth: '95%' }} >
            <Table aria-label='simple table'>
                <TableHeader />
                <TableBody>
                    {cohortStudents.map((row, index) => (
                        <React.Fragment key={index}>
                            <TableRows row={row} />
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
