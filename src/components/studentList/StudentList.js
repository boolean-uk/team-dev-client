import { useEffect, useState } from 'react';
import './style.css';
import jwt_decode from 'jwt-decode';
import client from '../../utils/client';
import Avatar from '@mui/material/Avatar';


const StudentList = () => {
    const [cohortId, setCohortId] = useState(1)
    const [listOfUsers, setListOfUsers] = useState([
        {
            first_name: 'Juan',
            last_name: 'Xander',
            biography: 'Hola!',
            profile_image_url: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
            github_url: 'https://github.com/JohnXander',
        },
        {
            first_name: 'Ivan',
            last_name: 'Xander',
            biography: 'Privet!',
            profile_image_url: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg',
            github_url: 'https://github.com/JohnXander',
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
        if (loadedToken === null) {
            return null;
        }
        const decoded = jwt_decode(loadedToken);
        return decoded.userId;
    };

    return (
        <div className='student-list-container'>
            <h3>Cohort: {String(26)}</h3>
            {listOfUsers.map(user => {
                return (
                    <>
                        <div className='student-list'>
                            <Avatar
                                alt="Profile Pic"
                                src={user.profile_image_url}
                            />
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default StudentList