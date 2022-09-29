import { useState } from 'react';
import client from '../../../utils/client';
import { Button, TextField } from '@mui/material';
import { Alert } from '@mui/material';
import './style.css';

const CreateCohortByName = () => {
  const [successCohortCreate, setSuccessCohortCreate] = useState(false);
  const [errorCohortCreate, setErrorCohortCreate] = useState(false);
  const [name, setCohortName] = useState('');

  function createCohortName(event) {
    event.preventDefault();
    setCohortName(event.target.value);
  }

  function createCohort(event) {
    event.preventDefault();
    client

      .post('/cohort', { name })

      .then(res => {
        if (res.data.status === 'success') {
          setSuccessCohortCreate(true);
        }
        setTimeout(() => {
          setSuccessCohortCreate(false);
        }, '3000');
      })
    .catch(err => {
      console.error(err.response);
      setErrorCohortCreate(true);
      setTimeout(() => {
        setErrorCohortCreate(false);
      }, '3000');
    })
  }

  return (
    <>
      <div className="create">
        <TextField
          id="cohort-name"
          label="enter cohort name"
          variant="filled"
          onChange={createCohortName}
        />

        <div className="create-cohort-button">
          <Button variant="contained" onClick={createCohort}>
            Create New Cohort
          </Button>
          {successCohortCreate && (
            <Alert
              sx={{ maxWidth: '400px', margin: 'auto' }}
              severity="success"
            >
              Cohort created successfully. Please refresh.
            </Alert>
          )}
          {errorCohortCreate && (
            <Alert sx={{ maxWidth: '400px', margin: 'auto' }} severity="error">
              Cohort not created, please provide a name.
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCohortByName;
