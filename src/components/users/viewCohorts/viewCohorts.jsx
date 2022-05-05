import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewCohort.css";
import Header from "../../Header/Header.jsx";
import client from "../../../utils/client";

export default function ViewCohort() {
  const { id } = useParams();
  const [noCohort, setNoCohort] = useState([]);

  useEffect(() => {
    client.get(`/user/student?cohort=none`)
      .then((res) => setNoCohort(res.data.data))
      .catch((err) => console.log(err.response));
  }, [id]);


function addStudent(studentId) {
    const options = {
      body: JSON.stringify({
        studentId: studentId
      })
    }
  client.patch(`/user/student/cohort/${id}`, options)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err.response));
}


  return (
    <>
      <Header />
      <div className="BigContainer">
        <div className="Container_cohorts">
          <h3>Cohort {id}</h3>
        </div>
        <div className="Container_addStudent">
          <div>
            <h3>Available students</h3>
          </div>
          <div className="add-student-container">
            {noCohort.map((student, key) => (

              <div className="add-student-card" key={key}>
                <div className="add-student">
<<<<<<< HEAD
                  {student.user.firstName} {student.user.lastName}
=======
                  {student.profile.firstName} {student.profile.lastName}
>>>>>>> 149372d2a8bb8f4e574ab78404bb7246f2e33aca
                </div>
                <button onClick={() => {addStudent(student.user.id)}} value={student.id}>
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
