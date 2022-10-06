import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

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
              <NavLink to="/module">Modules</NavLink>
            </Button>
            <Button variant="contained">
              <NavLink to="/unit">Units</NavLink>
            </Button>
            <Button variant="contained">
              <NavLink to="/lesson">Lessons</NavLink>
            </Button>
            <Button variant="contained">
              <NavLink to="/exercise">Exercises</NavLink>
            </Button>
          </div>

          <div>
              <SearchBar />
            <div className="cohorts_view">
              <h4>Current Cohorts:</h4> 
              <CohortList header="true" />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default TeacherAdmin;
