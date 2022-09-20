import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../utils/client';
import './style.css';

const CohortList = () => {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    client
      .get('/cohort')
      .then(res => {
        setCohorts(res.data.data.cohorts);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      <div className="cohort-list">
        {cohorts.map(cohort => {
          return (
            <Link to={`/cohort/${cohort.id}`} key={`${cohort.id}`}>
              <Card className="cohort-card">
                {`cohort ${cohort.id} - cohort name`}
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default CohortList;
