import { useState, useEffect } from "react";
import client from "../../utils/client";
// import "./style.css";

function CohortList({ role }) {
  const [cohort, setCohort] = useState();
  useEffect(() => {
    if (role === "TEACHER") {
      client.get("/cohort").then((res) => setCohort(res.data.data));
    }
  }, []);
  return (
    <><section className="cohort-container">
      <h2 className="cohortList-title">Cohort List</h2>
      <ul>
        {cohort != null && (
          cohort.map((cohort) =>
            <li key={cohort.id} className='cohort-list'> Cohort {cohort.id} </li>
          )
        )}
      </ul>
    </section>
    </>
  );
}

export default CohortList;
