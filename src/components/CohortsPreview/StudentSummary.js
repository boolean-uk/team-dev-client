import { useEffect, useState } from 'react';
import client from '../../utils/client';
import './cohorts-preview.css'

export default function StudentSummary({ id, handleClick }) {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    client.get(`/user/${id}`)
      .then(res => setStudentData(res.data.data.user))
  }, [id]);

  let name
  if (studentData) {
    name = `${studentData.first_name} ${studentData.last_name}`
  }

  return (
    <>
      {studentData &&
        <div className='student-summary'>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>BIO:</strong> {`${studentData.biography}`}</p>
          <p><strong>Email:</strong> {`${studentData.email}`}</p>
        </div>}

      <div 
        className='cohorts-preview__list-item-information'
        onClick={() => handleClick({ componentId: 'cohorts'} )}
      >
        <span>&#129144;</span>
        <span>Back</span>
      </div>
    </>
  )
}