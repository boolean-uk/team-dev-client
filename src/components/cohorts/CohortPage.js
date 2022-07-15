import Header from '../Header/Header';
import client from '../../utils/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';

const CohortPage = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [cohort, setCohort] = useState()
  const [studentsInCohort, setStudentsInCohort] = useState()
  const [availableUsers, setAvailableUsers] = useState()

  useEffect(() => {
    client
        .get(`/cohort/${params.id}?availableStudents=true`)
        .then((res) => {
          setCohort(res.data.data)
          setStudentsInCohort(res.data.data.users)
          setAvailableUsers(res.data.data.availableStudents)
        })
        .catch((err) => console.error(err.response));
  }, [params]);

  const handleSubmitAddStudentToCohort = (e, userId) => {
    e.preventDefault();
    client
        .patch(`/user/${userId}`, { cohort_id: +params.id })
        .then((res) => {
          const targetStudent = availableUsers.find((user) => user.user.id === userId)
          const updatedStudentsInCohort = [...studentsInCohort, targetStudent]
          setStudentsInCohort(updatedStudentsInCohort)

          const updatedAvailableUsers = availableUsers.filter((user) => user.user.id !== userId)
          setAvailableUsers(updatedAvailableUsers)
        })
        .catch((err) => console.error(err.response));
  };

  const handleClick = (e, userId) => {
    e.preventDefault();
    navigate(`../profile/${userId}`, { replace: true })
  }

  const startDate = cohort?.startDate.split('T')[0]
  const endDate = cohort?.endDate.split('T')[0]

  return (
      <>
        <Header companyName={`Cohort Manager 2.0`} />
        <div className='container'>

          <div className='border'>
            <h2 className='cohort-name'>{cohort?.cohortName}</h2>
            <h2><span className='dates'>Start Date: {startDate}</span></h2>
            <h2><span className='dates'>End Date: {endDate}</span></h2>

            <div className='student-container'>
            {studentsInCohort?.map((user, index) => (
              <div className='student' key={index}>
                <h3>{user.user.first_name} {user.user.last_name}</h3> 
                  <img 
                    className='profile-picture' 
                    src={user.user.profile_url} 
                    alt='user profile pic' 
                    onClick={(e) => handleClick(e, user.user.id)}
                  />
                <ul className='student-links'>
                  <li><i>Email: {user.user.email}</i> </li>
                  <li><i>GitHub: {user.user.github_url}</i></li>
                </ul>
              </div>
            ))}
            </div>
          </div>

          <div className='border'>
            <h2>Available Users</h2>
            {availableUsers?.map((user, index) => (
              <div key={index}>
                <p>{user.user.first_name} {user.user.last_name}</p>
               	<button onClick={(e) => handleSubmitAddStudentToCohort(e, user.user.id)}>Add to Cohort</button>
              </div>
            ))}
          </div>

        </div>
      </>
  );
};

export default CohortPage;
