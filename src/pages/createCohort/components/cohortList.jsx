import { Button, Card, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../utils/client';
import './style.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const CohortList = ({ header }) => {
  const [cohorts, setCohorts] = useState([]);
  const [expand, setExpand] = useState('');
  const [newCohortName, setNewCohortName] = useState('');
  const [updateCohortNameRes, setUpdateCohortRes] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    client
      .get('/cohort')
      .then(res => {
        setCohorts(res.data.data.cohorts);
      })
      .catch(console.log);
  }, []);

  const updateCohortName = event => {
    event.preventDefault();
    if (!newCohortName) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      client
        .patch(`/cohort/${event.target.id}`, { name: newCohortName }, true)
        .then(res => {
          if (res.data.status === 'success') {
            setUpdateCohortRes(true);
          }
        })
        .then(
          client
            .get('/cohort')
            .then(res => {
              setCohorts(res.data.data.cohorts);
            })
            .catch(console.log)
        )
        .catch(console.log);

      setNewCohortName('');

      setTimeout(() => {
        setUpdateCohortRes(false);
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
          if (cohort.name !== null) {
            return (
              <Card key={cohort.id} className="cohort-view">
                {`id - ${cohort.id}`}
                {` | Name - ${cohort.name}`}
              </Card>
            );
          } else {
            return (
              <Card key={cohort.id} className="cohort-view">
                {`id - ${cohort.id}`}
              </Card>
            );
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
                    {updateCohortNameRes === true && <p>successful</p>}
                    {error === true && <p>please enter a valid name!</p>}
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
