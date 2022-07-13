import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import client from '../../utils/client';
import './CohortExercisePage.css'

export default function ExercisePage() {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [cohortExercises, setCohortExercises] = useState([]);

  const unitOne = [
    'Exercise one',
    'Exercise two',
    'Exercise three',
    'Exercise four',
    'Exercise five',
    'Exercise six',
    'Exercise seven',
    'Exercise eight'
  ];

  const unitTwo = ['Exercise one', 'Exercise two'];

  const unitThree = [
    'Exercise one',
    'Exercise two',
    'Exercise three',
    'Exercise four',
    'Exercise five',
  ];

  const unitArr = [unitOne, unitTwo, unitThree];

  useEffect(() => {
    client
      .get(`/cohort/${loggedInUser.cohort_id}/cohortExercises`)
      .then((res) => setCohortExercises(res.data.data.cohortExercises))
      .catch((err) => console.error(err.response));
  }, []);

  return (
    <div>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className='cohortExercise-container'>
        {unitArr.map((unit, unitIndex) => (
          <div className='unit-container' key={unitIndex}>
            {/* Later replace unit name */}
            <h2>Unit Name</h2> 
            <ul className='grid-three-columns'>
              {unit.map((exercise, exerciseIndex) => (
                <li className='exercise-container' key={exerciseIndex}>{exercise}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
