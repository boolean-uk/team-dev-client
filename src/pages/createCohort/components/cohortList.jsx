import { Card } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../../utils/client';
import './style.css';

const CohortList = ({ header }) => {
  const [cohorts, setCohorts] = useState([]);

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
              <Card key={cohort.id} className="cohort-view">
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
