import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import client from '../../utils/client';
import './style.css'
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';

const StudentList = () => {
    const navigate = useNavigate()
    const [cohortId, setCohortId] = useState()
    const [listOfStudents, setListOfStudents] = useState([])

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

    useEffect(() => {
        if (cohortId !== undefined) {
            client
                .get(`/users?cohort_id=${String(cohortId)}`)
                .then(res => setListOfStudents(res.data.data.users))
                .catch(err => console.log(err));
        }

        // eslint-disable-next-line
    }, [cohortId]);

    const getLoggedInUserId = () => {
        const loadedToken = localStorage.getItem('token');
        if (loadedToken === null || loadedToken === '') {
            return null;
        }
        const decoded = jwt_decode(loadedToken);
        return decoded.userId;
    };

    const handleClick = (u) => {
        navigate('/profile', { state: { user: u } })
    }

    return (
        <>
            <div className='list-container'>
                {cohortId && <h2>Cohort {cohortId}</h2>}
                {cohortId && <h4>{listOfStudents.length} online</h4>}
                {cohortId && listOfStudents.map(u => {
                    return (
                        <div key={u.id} className='list-item'>
                            <Avatar
                                alt="Profile Pic"
                                src={u.profile_image_url}
                            />
                            <p onClick={() => handleClick(u)}>{u.first_name} {u.last_name}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default StudentList