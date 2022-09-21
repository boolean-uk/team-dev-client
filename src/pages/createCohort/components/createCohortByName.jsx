import { useState } from 'react';
import client from '../../../utils/client';
import { Button, TextField } from '@mui/material';
import './style.css';

const CreateCohortByName = () => {
  const [createCohortRes, setCreateCohortRes] = useState(false);
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
          setCreateCohortRes(true);
          
        }
      })
      .catch(console.log);
    setTimeout(() => {
      setCreateCohortRes(false);
    }, 3000);
    window.location.reload()
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
          {createCohortRes && <p>Cohort created!</p>}
        </div>
      </div>
    </>
  );
};

export default CreateCohortByName;
