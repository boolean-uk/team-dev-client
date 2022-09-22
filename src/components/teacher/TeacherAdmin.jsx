import React from 'react'
import { NavLink } from 'react-router-dom';

import './style.css'

import { Box, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CohortList from '../../pages/createCohort/components/cohortList';
import SearchBar from './components/SearchBar';



function TeacherAdmin() {
  return (
    <section className="admin__container">
      <div className="teacher-section">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Card variant="outlined" sx={{ width: 1000 }}>
            <h3>Teacher Admin</h3>
            <CardActions>
              <Button variant="contained">
                <NavLink to="/cohort">Manage Cohort</NavLink>
              </Button>
              <Button variant="contained">
                <NavLink to="/enrolment">Enrolment</NavLink>
              </Button>
              <SearchBar />
            </CardActions>
            Current Cohorts: <CohortList header="true" />
          </Card>
        </Box>
      </div>
    </section>
  );
}

export default TeacherAdmin