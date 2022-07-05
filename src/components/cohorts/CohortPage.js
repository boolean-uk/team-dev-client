import Header from '../Header/Header';
import client from '../../utils/client';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';

const CohortPage = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [cohortName, setCohortName] = useState()
  const [studentsInCohort, setStudentsInCohort] = useState()
  const [availibleUsers, setAvailibleUsers] = useState()

  useEffect(() => {
    client
        .get(`/cohort/${params.id}`)
        .then((res) => setCohortName(res.data.data.cohortName))
        .catch((err) => console.error(err.response));
  }, [params]);

  useEffect(() => {
    client
        .get(`/user?cohort_id=${params.id}`)
        .then((res) => setStudentsInCohort(res.data.data.users))
        .catch((err) => console.error(err.response));
  }, [params]);

  useEffect(() => {
    client
        .get(`/user?cohort=false`)
        .then((res) => setAvailibleUsers(res.data.data.users))
        .catch((err) => console.error(err.response));
  }, [params]);

  const handleSubmitAddStudentToCohort = (e, userId) => {
    e.preventDefault();

    client.patch(`/user/${userId}`, { cohort_id: +params.id })
    .then((res) => {
      const targetStudent = availibleUsers.find((user) => user.id === userId)
      const updatedStudentsInCohort = [...studentsInCohort, targetStudent]
      setStudentsInCohort(updatedStudentsInCohort)

      const updatedAvailibleUsers = availibleUsers.filter((user) => user.id !== userId)
      setAvailibleUsers(updatedAvailibleUsers)
    })
    .catch((err) => console.error(err.response));
  };

  const handleClick = (e, userId) => {
    e.preventDefault();
    navigate(`../profile/${userId}`, { replace: true })
  }

  return (
      <>
        <Header companyName={`Cohort Manager 2.0`} />
        <div className='container'>

          <div className='border'>
            <h2>Cohort Name: {cohortName}</h2>
            {studentsInCohort?.map((user, index) => (
              <div className='student' key={index}>
                <h3>{user.first_name} {user.last_name}</h3> 
                  <img 
                    className='profile-picture' 
                    src={user.profile_url} 
                    alt='user profile pic' 
                    onClick={(e) => handleClick(e, user.id)}
                  />
                <ul>
                  <li><i>Email: {user.email}</i> </li>
                  <li><i>GitHub: {user.github_url}</i></li>
                </ul>
              </div>
            ))}
          </div>

          <div className='border'>
            <h2>Availible Users</h2>
            {availibleUsers?.map((user, index) => (
              <div key={index}>
                <p>{user.first_name} {user.last_name}</p>
               	<button onClick={(e) => handleSubmitAddStudentToCohort(e, user.id)}>Add to Cohort</button>
              </div>
            ))}
          </div>

        </div>
      </>
  );
};

export default CohortPage;
