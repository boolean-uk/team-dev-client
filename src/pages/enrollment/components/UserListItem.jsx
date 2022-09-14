import { useState } from 'react';
import Button from '@mui/material/Button';

import client from '../../../utils/client';

const UserListItem = ({
  cohort_id,
  email,
  first_name,
  last_name,
  id,
  cohorts,
  setError,
}) => {
  const [userCohort, setUserCohort] = useState(cohort_id);

  const handleSubmit = e => {
    e.preventDefault();
    const cohort_id = e.target.cohortList.value;
    console.log(e.target.cohortList.value);
    client
      .patch(`/user/${id}`, { cohort_id })
      .then(res => setUserCohort(res.data.data.user.cohort_id))
      .catch(err => setError('error'));
  };

  return (
    <div>
      <div className="enrolment-container">
        <div className="studentCard">
          <div>picture</div>
          <p>
            {first_name} {last_name}
          </p>
          <p>{email}</p>
        </div>
        <div>{userCohort || 'Not Enrolled'}</div>

        <form onSubmit={handleSubmit}>
          <select
            name="cohortList"
            id="cohortList"
            required
            className="add-to-cohort-form-select"
          >
            <option defaultValue=""></option>
            {cohorts.map((cohort, i) => (
              <option key={i} value={cohort.cohort_id}>
                {cohort.cohort_id}
              </option>
            ))}
          </select>
          <Button variant="contained" type="submit">
            Add to Cohort
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserListItem;
