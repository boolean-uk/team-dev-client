import Header from '../Header/Header';
import client from '../../utils/client';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const CohortPage = () => {
  const params = useParams();
  const [cohort, setCohort] = useState()

  useEffect(() => {
    client
        .get(`/cohort/${params.id}`)
        .then((res) => {
            setCohort(res.data)
            console.log(res.data)
        })
        .catch((err) => console.error(err.response));
  }, [params]);

  return (
      <>
        <Header companyName={`Cohort Manager 2.0`} />
        <p>Cohort Name: {cohort?.data.id}</p>
      </>
  );
};

export default CohortPage;
