import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImg from '../../../ProfileImg/ProfileImg';

export default function ProfileLink({ person }) {
    return (
        <Link to={`/user/${person.user.id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <ProfileImg avatar={person.user.profileImgUrl}/>
        </Link>
    );
};