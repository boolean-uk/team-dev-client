import { useState, useEffect } from "react";
import client from "../../utils/client";
import "../cohort/CohortList.css";

function CohortList() {
  const [cohort, setCohort] = useState();
  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === "TEACHER") {
      client.get("/cohort").then((res) => setCohort(res.data.data));
    }
  }, []);

  return (
    <>
      <section className="cohort-container">
        <h3 className="cohortList-title">Cohort List</h3>
        <ul className="cohort-list">
          {cohort != null &&
            cohort.map((cohort) => (
              <li key={cohort.id}>
                {" "}
                <button className="list-btn"> Cohort {cohort.id}</button>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
}

export default CohortList;
