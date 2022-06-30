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
          console.log(res.data.data);
            setCohort(res.data.data)
        })
        .catch((err) => console.error(err.response));
  }, [params]);

  return (
      <>
        <Header companyName={`Cohort Manager 2.0`} />
        <p>Cohort Name: {cohort?.id}</p>
      </>
  );
};

export default CohortPage;
