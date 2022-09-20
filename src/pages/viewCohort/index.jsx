import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../utils/client';
import './style.css';

const ViewCohort = () => {
  const cohortId = parseInt(useParams()?.cohortId);

  const [cohort, setCohort] = useState({});

  useEffect(() => {
    client
      .get(`/cohort/${cohortId}`)
      .then(console.log)
      .catch(err => console.log('fetch /cohort/:id err', err));
  }, [cohortId]);

  return (
    <div>
      <div>hi</div>
    </div>
  );
};

export default ViewCohort;
