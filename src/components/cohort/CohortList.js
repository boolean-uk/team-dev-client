import { useState, useEffect } from 'react';
import client from '../../utils/client';
import Button from '@mui/material/Button';
import './CohortList.css';
import React from 'react';
import { Link } from 'react-router-dom';
import storage from '../../utils/storage';

function CohortList() {
  const [cohort, setCohort] = useState();
  useEffect(() => {
    const role = storage.loadStorage().role;
    if (role === 'TEACHER') {
      client.get('/cohort').then((res) => {
        setCohort(res.data.data)
      });
    }
  }, []);
  return (
    <>
      <div className='side-bar'>
        <section className='cohort-container'>
          <h3 className='cohortList-title'>Cohort List</h3>
          <ul className='cohort-list'>
            {cohort != null &&
              cohort.map((cohort) => (
                <li key={cohort.id}>
                  {' '}
                  <Link
                    to={`/cohort/${cohort.id}`}
                    style={{ textDecoration: 'none' }}>
                    <Button variant='contained' sx={{ minWidth: 125 }}>
                      {cohort.cohortName ? cohort.cohortName : `Cohort ${cohort.id}`}
                    </Button>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default CohortList;
