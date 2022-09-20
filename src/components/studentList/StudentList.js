import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import client from '../../utils/client';
import './style.css'

import Avatar from '@mui/material/Avatar';

const StudentList = () => {
    const [cohortId, setCohortId] = useState()
    const [listOfStudents] = useState([
        {
            first_name: 'Juan',
            last_name: 'Xander',
            profile_image_url: 'https://www.sciencefriday.com/wp-content/uploads/2022/04/pitbull-illustration.jpg'
        },
        {
            first_name: 'Ivan',
            last_name: 'Xander',
            profile_image_url: 'https://assets.hermes.com/is/image/hermesproduct/tresse-dog-collar--800555EJ02-worn-1-0-0-800-800_b.jpg'
        }
    ])

    useEffect(() => {
        const userId = getLoggedInUserId();
        if (userId === null) {
            return;
        }
        client
            .get(`/user/${userId}`)
            .then(res => setCohortId(res.data.data.user.cohort_id))
            .catch(err => console.log(err));
        // eslint-disable-next-line
    }, []);

    const getLoggedInUserId = () => {
        const loadedToken = localStorage.getItem('token');
        if (loadedToken === null || loadedToken === '') {
            return null;
        }
        const decoded = jwt_decode(loadedToken);
        return decoded.userId;
    };
    return (
        <>
            <div className='list-container'>
                <h2>Cohort {String(cohortId)}</h2>
                <h4>{listOfStudents.length} online</h4>
                {listOfStudents.map(u => {
                    return (
                        <div className='list-item'>
                            <Avatar
                                alt="Profile Pic"
                                src={u.profile_image_url}
                            />
                            <p>{u.first_name} {u.last_name}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default StudentList