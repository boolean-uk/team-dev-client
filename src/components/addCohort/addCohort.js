import React from "react-dom";
import { useState } from "react";
// import Button from " @material-ui/core/Button";

export default function AddCohort() {
  const [cohort, setCohort] = useState("");

  const handleChange = () => {
    console.log("read event: ");
  };
  return (
    <>
      <button onclick={() => handleChange()}>Add Cohort</button>
      {/* <Button variant="outlined">Default</Button> */}
    </>
  );
}
