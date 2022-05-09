import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';

export default function BasicTable(props) {
    const { cohortStudents } = props
    return (
        <TableContainer component={Paper} sx={{ marginLeft: 5, width: "90%", minWidth: "95%" }}>
            <Table aria-label="simple table"
            >
                <TableHead sx={{
                    backgroundColor: "#23232c"
                }}>
                    <TableRow >
                        <TableCell sx={{
                            color: "#ffffff", fontWeight: 'bold', borderBlockColor: "#23232c", textAlign: "center"
                        }}>Student ID</TableCell>
                        <TableCell sx={{
                            color: "#ffffff", fontWeight: 'bold', borderBlockColor: "#23232c", textAlign: "center"
                        }}>Profile</TableCell>
                        <TableCell sx={{
                            color: "#ffffff", fontWeight: 'bold', borderBlockColor: "#23232c", textAlign: "center"
                        }}>FirstName</TableCell>
                        <TableCell sx={{
                            color: "#ffffff", fontWeight: 'bold', borderBlockColor: "#23232c", textAlign: "center"
                        }} >LastName</TableCell>
                        <TableCell sx={{
                            color: "#ffffff", fontWeight: 'bold', borderBlockColor: "#23232c", textAlign: "center"
                        }}>Email</TableCell>
                        <TableCell sx={{
                            color: "#ffffff", fontWeight: 'bold', borderBlockColor: "#23232c", textAlign: "center"
                        }}>GitHub</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  >
                    {cohortStudents.map((row) => (
                        <TableRow key={row.user.firstName} sx={{
                            backgroundColor: "#464657"
                        }}>
                            <TableCell sx={{
                                color: "#ffffff", borderBlockColor:"#464657", textAlign: "center"
                            }}>{row.user.id}</TableCell>
                            <TableCell sx={{
                                color: "#ffffff", borderBlockColor:"#464657", textAlign: "center"
                            }}>
                                <Avatar >{row.user.firstName[0].toUpperCase()} {row.user.lastName[0].toUpperCase()} </Avatar>
                            </TableCell >
                            <TableCell sx={{
                                color: "#ffffff", borderBlockColor:"#464657", textAlign: "center"
                            }}>
                                {row.user.firstName}
                            </TableCell>
                            <TableCell sx={{
                                color: "#ffffff", borderBlockColor:"#464657", textAlign: "center"
                            }}>{row.user.lastName}</TableCell>
                            <TableCell sx={{
                                color: "#ffffff", borderBlockColor:"#464657", textAlign: "center"
                            }}>{row.user.email}</TableCell>
                            <TableCell sx={{
                                color: "#ffffff", borderBlockColor:"#464657", textAlign: "center"
                            }}>{row.user.githubUrl}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
