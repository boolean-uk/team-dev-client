const UserListItem = () => {
  return (
    <div>
      <div>
        <div>picture</div>
        <p>name</p>
        <p>email</p>
      </div>
      <div>
        <form>
          <select name="cohortList" id="cohortList" required>
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
