import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewCohort.css";
import Header from "../../Header/Header.jsx";
import client from "../../../utils/client";
import Table from "../../table/Table";
import Grid from "@mui/material/Grid";

export default function ViewCohort() {
  const { id } = useParams();
  const [noCohort, setNoCohort] = useState([]);
  const [cohortStudents, setCohortStudents] = useState([]);
  const [resetStudents, setResetStudents] = useState(0);

  useEffect(() => {
    client
      .get(`/user/student?cohort=none`)
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
        setResetStudents(resetStudents + 1)
        console.log(res.data)
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
    
        <div className="BigContainer">
          <div className="Container_cohorts">
            <h3 className="cohort-title">Cohort {id}</h3>
            <Table cohortStudents={cohortStudents} />
          </div>
        
        <div className="Container_addStudent">
          <div>
            <h3>Available students</h3>
          </div>
          <div className="add-student-container">
            {noCohort.map((student, key) => (
              <div className="add-student-card" key={key}>
                <div className="add-student">
                  {student.user.firstName} {student.user.lastName}
               
                <button
                  onClick={() => {
                    addStudent(student.user.id);
                  }}
                  value={student.id}
                >
                  Add
                </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </Grid>
    </>
  );
}