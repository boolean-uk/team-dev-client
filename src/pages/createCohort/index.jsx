import CohortList from './components/cohortList';
import CreateCohortByName from './components/createCohortByName';
import './style.css';

const CreateCohort = () => {
  return (
    <>
      <div className="create-cohort">
        <CreateCohortByName />
      </div>
      <div className="cohort-list">
        <CohortList />
      </div>
    </>
  );
};

export default CreateCohort;
