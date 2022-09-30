import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

import { CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CohortList from '../../pages/createCohort/components/cohortList';
import SearchBar from './components/SearchBar';

function TeacherAdmin() {
  return (
    <section className="admin-section">
      <Card>
        <div className="admin-section-container">
          <div className="admin-section-nav">
            <Button variant="contained">
              <NavLink to="/cohort">Manage Cohort</NavLink>
            </Button>
            <Button variant="contained">
              <NavLink to="/enrolment">Enrolment</NavLink>
            </Button>
            <Button variant="contained">
              <NavLink to="/exercise">Exercises</NavLink>
            </Button>
          </div>

          <div>
            <SearchBar />
            <h4 style={{ textAlign: 'left', marginTop: '10px' }}>
              Current Cohorts:
            </h4>{' '}
            <CohortList header="true" />
          </div>
        </div>
      </Card>
    </section>
  );
}

export default TeacherAdmin;
