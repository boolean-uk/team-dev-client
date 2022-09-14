import client from '../../../utils/client';

const UserListItem = ({
  cohort_id,
  email,
  first_name,
  last_name,
  id,
  cohorts,
}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const cohort_id = e.target.cohortList.value;
    console.log(e.target.cohortList.value);
    // client.patch(`/user/${id}`,);
  };

  return (
    <div>
      <div className="container">
        <div className="studentCard">
          <div>picture</div>
          <p>
            {first_name} {last_name}
          </p>
          <p>{email}</p>
        </div>
        <div>{cohort_id || 'Not Enrolled'}</div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <select name="cohortList" id="cohortList" required>
            <option value="Please Select" disabled selected></option>
            {cohorts.map(cohort => (
              <option value={cohort.cohort_id}>{cohort.cohort_id}</option>
            ))}
          </select>
          <button>Add to Cohort</button>
        </form>
      </div>
    </div>
  );
};

export default UserListItem;
