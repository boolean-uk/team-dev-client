import { useState, useEffect } from "react";
import client from "../../utils/client";
import Button from "@mui/material/Button";
import "./CohortList.css";
import React from "react";
function CohortList() {
  const [cohort, setCohort] = useState();
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "TEACHER") {
      client.get("/cohort").then((res) => setCohort(res.data.data));
    }
  }, []);

  return (
    <>
      <div className="side-bar">
        <section className="cohort-container">
          <h3 className="cohortList-title">Cohort List</h3>
          <ul className="cohort-list">
            {cohort != null &&
              cohort.map((cohort) => (
                <li key={cohort.id}>
                  {" "}
                  <Button className="list-btn" variant="contained"> Cohort {cohort.id}</Button>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default CohortList;
