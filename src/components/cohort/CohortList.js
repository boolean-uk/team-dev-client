import { useState, useEffect } from "react";
import client from "../../utils/client";

function CohortList() {
  const [cohort, setCohort] = useState();
  useEffect(() => {
    const role = localStorage.getItem('role')
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
