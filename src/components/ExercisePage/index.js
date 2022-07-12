import { useEffect, useState } from 'react';
import './exerciseList.css';
import ExerciseForm from './ExerciseForm';
import client from '../../utils/client';
import Header from '../Header/Header';

export default function ExercisePage() {
  const [data, setData] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    client
      .get(`/courses`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err.response));
  }, []);

  useEffect(() => {
    const showExercises = [];

    if (data) {
      data.forEach((course) => {
        course.modules.forEach((module) =>
          module.units.forEach((unit) =>
            unit.exercises.forEach((exercise) => showExercises.push(exercise))
          )
        );
      });
    }
    setExercises(showExercises);
  }, [data]);

  return (
    <>
    <Header companyName={`Cohort Manager 2.0`}/>

      <ExerciseForm
        data={data}
        setExercises={setExercises}
        exercises={exercises}
      />
      <ul className='exercise-ul'>
        {exercises.map((exercise) => (
          <li key={exercise.id} className='exercise-li'>
            <a href={exercise.githubUrl} target='_blank' rel='noreferrer'>
              {exercise.exerciseName}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
