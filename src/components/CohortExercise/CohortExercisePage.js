import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import client from '../../utils/client';
import './CohortExercisePage.css'

export default function ExercisePage() {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [cohortExercises, setCohortExercises] = useState([]);

  const sortToUnits = () => {
    cohortExercises.sort((cohortExercise, nextCohortExercise) => {
        const unitId = cohortExercise.cohortExercise.exercise.unitId
        const nextUnitId = nextCohortExercise.cohortExercise.exercise.unitId
        return unitId - nextUnitId
    })
}

const createUnitsArray = () => {
  sortToUnits()
  let exsByUnit = {}
  cohortExercises.forEach(exercise => {
    const unitId = exercise.cohortExercise.exercise.unitId
    const unitKey = `unit${unitId}`
    if ( !exsByUnit[unitKey] ) {
        exsByUnit[unitKey] = []
    }

    exsByUnit[unitKey].push(exercise)
});
return exsByUnit
}

useEffect(() => {
    client
      .get(`/cohort/${loggedInUser.cohort_id}/cohortExercises`)
      .then((res) =>
        setCohortExercises(res.data.data.cohortExercises))
    .catch((err) => console.error(err.response));
}, []);

const unitsObj = createUnitsArray()
const units = Object.values(unitsObj)

return (
    <div>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className='cohortExercise-container'>
        {units.map((unit, unitIndex) => (
            <ul className='unit-container' key={unitIndex}>
            <li> 
             <h2>{unit[0].cohortExercise.exercise.unit.unitName}</h2> 
             <ul className='grid-three-columns'>
              {unit.map((exercise, exerciseIndex) => (
                <li className='exercise-container' key={exerciseIndex}>{exercise.cohortExercise.exercise.exerciseName}</li>
              ))}
             </ul>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}