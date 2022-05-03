import { useState, useEffect } from "react";
import client from "../../utils/client";
import "../cohort/CohortList.css";

function CohortList({ role }) {
  const [cohort, setCohort] = useState();
  useEffect(() => {
    if (role === "TEACHER") {
      client.get("/cohort").then((res) => setCohort(res.data.data));
    }
  }, []);

  console.log(role);

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
