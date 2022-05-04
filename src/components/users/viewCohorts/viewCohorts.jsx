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
    client
      .get(`/user`)
      .then((res) => {
        const noCo = res.data.data.users.filter(
          (user) => user.role === "STUDENT" && user.cohort_id === null
        );
        setNoCohort(noCo);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const addStudent = (event) => {
    client.patch(`/user/${event.target.value}/cohort`, { cohort_id: id })
    .then(res => console.log(res))
  };

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
                  {student.firstName} {student.lastName}
                </div>
                <button onClick={addStudent} value={student.id}>
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
