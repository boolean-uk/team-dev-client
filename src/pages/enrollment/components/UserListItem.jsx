import { useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DEFAULTIMG from '../../../assets/default.png';
import client from '../../../utils/client';

const UserListItem = ({
  cohort_id,
  email,
  first_name,
  last_name,
  profile_image_url,
  id,
  cohorts,
  setError,
}) => {
  const [userCohort, setUserCohort] = useState(cohort_id);
  const [selectedCohort, setSelectedCohort] = useState('');

  const handleChange = e => {
    setSelectedCohort(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const cohort_id = selectedCohort;

    client
      .patch(`/user/${id}/cohort`, { cohort_id })
      .then(res => setUserCohort(res.data.data.user.cohort_id))
      .catch(err => setError('error'));
  };

  return (
    <div className="enrolment__student-container">
      <div className="enrolment__student-card">
        <img
          className="enrolment__profile-image"
          src={profile_image_url || DEFAULTIMG}
          alt="Profile"
        />

        <div className="enrolment__user-text">
          <span style={{ marginRight: '8px' }}>{first_name}</span>
          <span>{last_name}</span>
          <p className="enrolment__user-email">{email}</p>
        </div>
      </div>
      <div>{userCohort ? `Cohort: ${userCohort}` : 'Not Enrolled'}</div>

      <form onSubmit={handleSubmit} className="enrolment__form">
        <FormControl>
          <InputLabel>Cohort</InputLabel>
          <Select
            id="cohortList"
            label="Cohort"
            value={selectedCohort}
            onChange={handleChange}
            required
          >
            {cohorts.map((cohort, i) => (
              <MenuItem key={i} value={cohort.id}>
                {cohort.id}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Add to Cohort
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

export default UserListItem;
