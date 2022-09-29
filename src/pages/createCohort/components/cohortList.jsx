import { Button, Card, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from '@mui/material';
import client from '../../../utils/client';
import './style.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const CohortList = ({ header }) => {
  const [cohorts, setCohorts] = useState([]);
  const [expand, setExpand] = useState('');
  const [newCohortName, setNewCohortName] = useState('');
  const [successCohortName, setCohortName] = useState(false);
  const [errorCohortName, setErrorCohortName] = useState(false);

  useEffect(() => {
    client
      .get('/cohort')
      .then(res => {
        setCohorts(res.data.data.cohorts);
      })
      .catch(err => console.error('[error]', err));
  }, []);

  const updateCohortName = event => {
    event.preventDefault();
    if (!newCohortName) {
      setErrorCohortName(true);
      setTimeout(() => {
        setErrorCohortName(false);
      }, 3000);
    } else {
      client
        .patch(`/cohort/${event.target.id}`, { name: newCohortName }, true)
        .then(res => {
          if (res.data.status === 'success') {
            setCohortName(true);
          }
        })
        .then(
          client
            .get('/cohort')
            .then(res => {
              setCohorts(res.data.data.cohorts);
            })
            .catch(err => console.error('[error]', err))
        )
        .catch(err => console.error('[error]', err));

      setNewCohortName('');

      setTimeout(() => {
        setCohortName(false);
      }, 3000);
    }
  };

  function enterNewName(event) {
    event.stopPropagation();
    event.preventDefault();
    setNewCohortName(event.target.value);
  }

  if (header) {
    return (
      <div className="cohort-teacher-view">
        {cohorts.map(cohort => {
          return (
            <Card key={cohort.id} className="cohort-view">
              {cohort.name ? `Name: ${cohort.name}` : `ID: ${cohort.id}`}
            </Card>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <div className="cohort-list">
        {cohorts.map(cohort => {
          return (
            <div key={cohort.id}>
              <Card key={cohort.id} className="cohort-card">
                <Typography>{`cohort ${cohort.id} - ${cohort.name}`}</Typography>
                <IconButton
                  key={cohort.id}
                  onClick={() => {
                    setExpand(cohort.id);
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
                {expand === cohort.id && (
                  <>
                    <form>
                      <label htmlFor="newName">New cohort name:</label>
                      <input
                        type="text"
                        id="newName"
                        key={cohort.id}
                        onChange={enterNewName}
                        value={newCohortName}
                      ></input>
                    </form>
                    <Button
                      id={cohort.id}
                      className="edit"
                      onClick={updateCohortName}
                    >
                      submit
                    </Button>
                    {successCohortName && (
                      <Alert
                        sx={{ maxWidth: 'fit-content', margin: 'auto' }}
                        severity="success"
                      >
                        Cohort name updated successfully.
                      </Alert>
                    )}
                    {errorCohortName && (
                      <Alert
                        sx={{ maxWidth: 'fit-content', margin: 'auto' }}
                        severity="error"
                      >
                        Cohort not updated, please provide a name.
                      </Alert>
                    )}
                    <br></br>
                    <Link to={`/cohort/${cohort.id}`} key={cohort.id}>
                      <Button
                        id={cohort.id}
                        variant="contained"
                        key={cohort.id}
                      >
                        View Cohort
                      </Button>
                    </Link>
                  </>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default CohortList;
