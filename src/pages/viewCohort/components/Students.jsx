import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import DEFAULTIMG from '../../../assets/default.png';

const Students = ({ cohort }) => {
  const navigate = useNavigate();

  const handleProfileClick = user => {
    const thisUser = {
      'first_name': user.profile.firstName,
      'last_name': user.profile.lastName,
      'email': user.email,
      'biography': user.profile.bio,
      'github_url': user.profile.githubUrl,
      'cohort_id': cohort.id,
      'profile_image_url': user.profile.profileImageUrl,
      'role': user.role,
    }
    navigate('/profile', { state: { user: thisUser } });
  };

  return (
    <div className="view-cohort-students">
      <h3>Students</h3>
      <ul>
        {cohort?.users?.length === 0 ? (
          <li>
            <p>No students enroled</p>
            <Link to="/enrolment">
              <Button variant="contained">Enrol Students</Button>
            </Link>
          </li>
        ) : (
          cohort?.users?.map(user => (
            <li
              key={user.email}
              className="view-cohort__student-card"
              onClick={() => handleProfileClick(user)}
            >
              <img
                className="view-cohort__profile-image"
                src={user.profile.profileImageUrl || DEFAULTIMG}
                alt="Profile"
              />

              <div className="view-cohort__user-text">
                <span style={{ marginRight: '8px' }}>
                  {user.profile.firstName}
                </span>
                <span>{user.profile.lastName}</span>
                <p className="view-cohort__user-email">{user.email}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Students;
