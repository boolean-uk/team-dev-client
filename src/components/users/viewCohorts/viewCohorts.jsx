import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewCohort.css";
import client from "../../../utils/client";

export default function ViewCohort() {
  const { id } = useParams();
  const [noCohort, setNoCohort] = useState([]);
  const [cohortStudents, setCohortStudents] = useState([]);
  const [resetStudents, setResetStudents] = useState(0);

  useEffect(() => {
    client
      .get('/user/student?cohort=none')
      .then((res) => setNoCohort(res.data.data))
      .catch((err) => console.log(err.response));

    client
      .get(`/user/student?cohort=${id}`)
      .then((res) => setCohortStudents(res.data.data))
      .catch((err) => console.log(err.response));
  }, [resetStudents]);

  function addStudent(studentId) {
    const data = { cohort_id: id };
    client
      .patch(`/user/${studentId}/cohort`, data)
      .then((res) => {
        setResetStudents(resetStudents + 1);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <div className="BigContainer">
        <div className="Container_cohorts">
          <h3>Cohort {id}</h3>
          <div className='cohort-student-list-container'>
            {cohortStudents.map((student, key) => (
              <div className='cohort-student-card' key={key}>
                <div className='cohort-student'>
                  {student.user.firstName} {student.user.lastName}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='Container_addStudent'>
          <div>
            <h3>Available students</h3>
          </div>
          <div className='add-student-container'>
            {noCohort.map((student, key) => (
              <div className='add-student-card' key={key}>
                <div className='add-student'>
                  {student.user.firstName} {student.user.lastName}
                </div>
                <button
                  onClick={() => {
                    addStudent(student.user.id);
                  }}
                  value={student.user.id}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}