import Header from '../Header/Header'
import { useState, useEffect, useContext } from 'react'
import { loggedInUserContext } from "../../Helper/loggedInUserContext";
import client from '../../utils/client'

export default function ExercisePage() {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [cohortExercises, setCohortExercises] = useState([])


    useEffect(() => {
      client
        .get(`/cohort/${loggedInUser.cohort_id}/cohortExercises`)
        .then((res) => setCohortExercises(res.data.data.cohortExercises))
        .catch((err) => console.error(err.response));
    }, []);

    return (
    <>
    <Header companyName={`Cohort Manager 2.0`}/>
   <ul>

   </ul>
    </>    )
}
