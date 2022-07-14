import Header from '../Header/Header';
import { useState, useEffect, useContext } from 'react';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import client from '../../utils/client';
import './CohortExercisePage.css'

export default function ExercisePage() {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [cohortExercises, setCohortExercises] = useState([]);
  const [units, setUnits] = useState([])

  const sortToUnits = () => {
    cohortExercises.sort((cohortExercise, nextCohortExercise) => {
        const unitId = cohortExercise.cohortExercise.exercise.unitId
        const nextUnitId = nextCohortExercise.cohortExercise.exercise.unitId
        return unitId - nextUnitId
    })
}

  const createUnitsArray = () => {
    sortToUnits()
    const unitsArray = []
    for(let i = 0; i < cohortExercises.length-1; i++) {
        let unitArray = []
        const currentUnitId = cohortExercises[i].cohortExercise.exercise.unitId
        const nextUnitId = cohortExercises[i+1].cohortExercise.exercise.unitId
       
        if (currentUnitId === nextUnitId) {
            unitArray.push(cohortExercises[i])
        } else {
            unitsArray.push(unitArray)
            console.log("in the else statement: ", unitsArray)
            unitArray = []
        }
        console.log("out of for loop: ", unitArray)
    }  
    console.log("let's check the unitsArray: ", unitsArray)  
    setUnits(unitsArray)
  } 

// loop through cohortExercises
// create currentUnitId and nextUnitId
// check if the next cohortExercise is the same as currentId
// if it is the same, push it to an empty array
// if not, reset the array empty and create a new array, push the cohortExercise
// at the end, push all the created array into unitsArray


//   create a function that pushes the created arrays into unit array


//   const unitOne = [
//     'Exercise one',
//     'Exercise two',
//     'Exercise three',
//     'Exercise four',
//     'Exercise five',
//     'Exercise six',
//     'Exercise seven',
//     'Exercise eight'
//   ];

//   const unitTwo = ['Exercise one', 'Exercise two'];

//   const unitThree = [
//     'Exercise one',
//     'Exercise two',
//     'Exercise three',
//     'Exercise four',
//     'Exercise five',
//   ];

  useEffect(() => {
    client
      .get(`/cohort/${loggedInUser.cohort_id}/cohortExercises`)
      .then((res) =>setCohortExercises(res.data.data.cohortExercises))
      .then(() => createUnitsArray())
      .catch((err) => console.error(err.response));
  }, []);

  return (
    <div>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className='cohortExercise-container'>
        {units.map((unit, unitIndex) => (
          <ul className='unit-container' key={unitIndex}>
            <li>
             {/* Later replace unit name */}
             <h2>Unit Name</h2> 
             <ul className='grid-three-columns'>
              {unit.map((exercise, exerciseIndex) => (
                <li className='exercise-container' key={exerciseIndex}>{exercise}</li>
              ))}
             </ul>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}