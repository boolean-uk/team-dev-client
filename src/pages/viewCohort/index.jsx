import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import Spinner from '../../components/Spinner';
import client from '../../utils/client';
import DEFAULTIMG from '../../assets/default.png';

import './style.css';

const ViewCohort = ({ setProfileView }) => {
  const navigate = useNavigate();
  const [cohort, setCohort] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const cohortId = parseInt(useParams().cohortId);

  useEffect(() => {
    if (!isNaN(cohortId)) {
      client
        .get(`/cohort/${cohortId}`)
        .then(res => {
          setCohort(res.data.data.cohort);
          setIsLoading(false);
        })
        .catch(err => console.log('[FETCH /cohort/:id]', err));
    }
  }, [cohortId]);

  const handleProfileClick = userId => {
    setProfileView(userId);
    navigate('/profile');
  };

  return (
    <div style={{ paddingInline: '10px' }}>
      <div className="view-cohort-container">
        {isLoading ? (
          <Spinner
            style={{
              position: 'absolute',
              right: '50%',
              top: '50%',
            }}
          />
        ) : (
          <>
            <h2>{cohort?.name}</h2>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCohort;
