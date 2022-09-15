import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import './style.css'

import Header from '../Header/Header';
import EditForm from './EditForm';

const Profile = ({ profileData, getLoggedInUserId, user, setUser }) => {
    const { first_name, last_name, biography, github_url, cohort_id } = profileData
    const [token] = useState(`Bearer ${localStorage.getItem(process.env.REACT_APP_USER_TOKEN)}`)

    const handleSubmit = (event) => {
        event.preventDefault()

        const userId = getLoggedInUserId()
        if (userId === null) { return }

        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "PATCH",
            headers: { Authorization: token }
        })
            .then(resp => resp.json())
            .then(data => setUser(data.data.user))
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { value, name } = event.target

        setUser({
            ...user,
            [name]: value,
        });
    }

    return (
        <>
            <Header companyName={`Cohort Manager 2.0`} />
            <div className='profile'>
                <Avatar
                    alt="Profile Pic"
                    sx={{ width: 325, height: 325, border: "#4b4b56 solid 5px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
                />
                <h1>{first_name} {last_name}</h1>
                <div className='profile-info'>
                    <div>
                        <p>Cohort: {cohort_id === null ? "N/A" : cohort_id}</p>
                        <Link
                            href={github_url}
                            sx={{ textDecoration: "none" }}
                            underline="hover"
                        >
                            My GitHub
                        </Link>
                    </div>
                    <p>"{biography}"</p>
                </div>
                <EditForm
                    profileData={profileData}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </div>
        </>
    )
}

export default Profile
