import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../../utils/client';
import CohortList from '../createCohort/components/cohortList';
import DEFAULTIMG from '../../assets/default.png';

import './style.css';
import Spinner from '../../components/Spinner';

const ViewCohort = ({ setProfileView }) => {
  const navigate = useNavigate();
  const [cohort, setCohort] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const cohortId = parseInt(useParams().cohortId);

  useEffect(() => {
    client
      .get(`/cohort/${cohortId}`)
      .then(res => {
        setCohort(res);
        setIsLoading(false);
      })
      .catch(err => console.log('fetch /cohort/:id err', err));
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
                {cohort?.users?.map(user => (
                  <li onClick={() => handleProfileClick(user.id)}>
                    <div className="enrolment__student-card">
                      <img
                        className="enrolment__profile-image"
                        src={user.profile_image_url || DEFAULTIMG}
                        alt="Profile"
                      />

                      <div className="enrolment__user-text">
                        <span style={{ marginRight: '8px' }}>
                          {user.first_name}
                        </span>
                        <span>{user.last_name}</span>
                        <p className="enrolment__user-email">{user.email}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCohort;
