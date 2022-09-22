import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import DEFAULTIMG from '../../../assets/default.png';

const Students = ({ cohort, setProfileView }) => {
  const navigate = useNavigate();

  const handleProfileClick = userId => {
    setProfileView(userId);
    navigate('/profile');
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
              onClick={() => handleProfileClick(user.id)}
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
