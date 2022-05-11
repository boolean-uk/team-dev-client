import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';

export default function ProfileLink({ person }) {
    return (
        <Link to={`/user/${person.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <Avatar>
                {person.user.firstName[0].toUpperCase()}
                {person.user.lastName[0].toUpperCase()}
            </Avatar>
        </Link>
    );
};