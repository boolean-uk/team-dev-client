import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import './style.css'

import EditForm from './EditForm';
import client from "../../utils/client";

const Profile = ({ getLoggedInUserId, user, setUser }) => {
    const { first_name, last_name, biography, github_url, cohort_id, profile_image_url } = user

    const handleSubmit = (event) => {
        event.preventDefault()
        const { first_name, last_name, biography, github_url, profile_image_url } = user

        const reqBody = {
            firstName: first_name,
            lastName: last_name,
            bio: biography,
            githubUrl: github_url,
            profileImageUrl: profile_image_url
        }

        const userId = getLoggedInUserId()
        if (userId === null) {
            return
        }

        client
            .patch("/user/myprofile", reqBody)
            .then(res => setUser(res.data.data.user))
            .catch(err => console.log(err));

    }

    const handleChange = (event) => {
        event.preventDefault()
        const { value, name } = event.target

        console.log("yes", event.target)

        setUser({
            ...user,
            [name]: value,
        });
    }

    return (
        <>
            <div className='profile'>
                <Avatar
                    alt="Profile Pic"
                    sx={{ width: 325, height: 325, border: "#4b4b56 solid 5px" }}
                    src={profile_image_url}
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
                    user={user}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </div>
        </>
    )
}

export default Profile
