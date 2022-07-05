import CohortsPreviewList from './CohortsPreviewList';
import StudentsPreviewList from './StudentsPreviewList';
import StudentSummary from './StudentSummary';
import { useState } from 'react';
import './cohorts-preview.css';

export default function CohortsPreview() {
  const [componentRendered, setComponentRendered] = useState('cohorts');
  const [previewCohortId, setPreviewCohortId] = useState(0);
  const [previewStudentId, setPreviewStudentId] = useState(0);

  const handleClick = ({ componentId, cohortId, studentId }) => {
    setComponentRendered(componentId);

    if (cohortId) {
      setPreviewCohortId(cohortId)
    }

    if (studentId) {
      setPreviewStudentId(studentId)
    }
  };

  return (
    <section className='cohorts-preview' id='cohorts'>
      <h2 className='cohorts-preview__title'>Cohorts Preview:</h2>
      {componentRendered === 'cohorts' && (
        <CohortsPreviewList handleClick={handleClick} />
      )}
      {componentRendered === 'students' && (
        <StudentsPreviewList handleClick={handleClick} id={previewCohortId} />
      )}
      {componentRendered === 'student-summary' && (
        <StudentSummary handleClick={handleClick} id={previewStudentId} />
      )}
    </section>
  );
}
