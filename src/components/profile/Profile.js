import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import "./style.css";

import Header from "../Header/Header";

const Profile = ({ profileData }) => {
  const { first_name, last_name, biography, github_url } = profileData;
  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className="profile">
        <Avatar
          alt="Profile Pic"
          sx={{ width: 350, height: 350 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
        />
        <div className="profile-info">
          <h1>
            {first_name} {last_name}
          </h1>
          <Link href={github_url} sx={{ textDecoration: "none" }}>
            GitHub Profile
          </Link>
          <p>{biography}</p>
        </div>
        <Button variant="contained">Edit Profile</Button>
      </div>
    </>
  );
};

export default Profile;
