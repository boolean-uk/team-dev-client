import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../utils/client';
import './style.css';

const CohortList = ({ header }) => {
  const [cohorts, setCohorts] = useState([]);
  console.log(cohorts);

  useEffect(() => {
    client
      .get('/cohort')
      .then(res => {
        setCohorts(res.data.data.cohorts);
      })
      .catch(console.log);
  }, []);

  if (header) {
    return (
      <div className="cohort-teacher-view">
        {cohorts.map(cohort => {
          if (cohort.name !== null) {
            return (
              <Card className="cohort-view">
                {`id - ${cohort.id}`}
                {` | Name - ${cohort.name}`}
              </Card>
            );
          } else {
            return <Card className="cohort-view">{`id - ${cohort.id}`}</Card>;
          }
        })}
      </div>
    );
  }
  return (
    <>
      <div className="cohort-list">
        {cohorts.map(cohort => {
          return (
            <Card className="cohort-card" key={`${cohort.id}`}>
              {`cohort ${cohort.id} - cohort name`}
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default CohortList;
