import { useState, useEffect } from "react";
import client from "../../utils/client";
import Header from "../Header/Header";
// import "./style.css";

function CohortList({ role }) {
  const [cohort, setCohort] = useState("");
  useEffect(() => {
    if (role === "TEACHER") {
      client.get("/cohort").then((res) => console.log("get request", res));
    }
  }, []);
  return (
    <>
      <h1>Testing now</h1>
    </>
  );
}

export default CohortList;
