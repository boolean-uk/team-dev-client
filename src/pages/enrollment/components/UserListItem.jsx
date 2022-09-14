const UserListItem = () => {
  return (
    <div className="container">
      <div className="studentCard">
        <div>picture</div>
        <p>name</p>
        <p>email</p>
      </div>
      <div className="">
        <form>
          <select name="cohortList" id="cohortList" required>
            <option value="Please Select" selected disabled>Select</option>
            <option value="cohort_id">1</option>
            <option value="cohort_id">2</option>
            <option value="cohort_id">3</option>
          </select>
          <button>Add to Cohort</button>
        </form>
      </div>
    </div>
  );
};

export default UserListItem;
