import React from "react";

export default function AddCohort() {
  const handleSubmit = () => {};
  const handleChange = () => {};
  return (
    <>
      <form handleSubmit={handleSubmit}>
        <label>Cohort Name</label>

        <div>
          <input
            name="addCohort"
            type="text"
            placeholder="Add cohort"
            // value={}
            handleChange={handleChange}
          />
        </div>

        <label>Start Date</label>
        <div>
          <input name="date" type="date" />
        </div>

        <label>End Date</label>

        <div>
          <input name="date" type="date" />
        </div>
        <input
          className="submitButton"
          type="submit"
          value="Add Cohort"
          handleChange={handleChange}
        />
      </form>
    </>
  );
}
// Cohort Name
// Start Date
// End Date
