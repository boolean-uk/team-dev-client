import React, { useState } from "react";
import DeliveryLogFormLine from "./DeliveryLogFormLine";

export default function DeliveryLogCreateForm({ cohorts, logsData, setLogsData }) {
  const [cohort, setCohort] = useState();
  const [linesData, setLinesData] = useState([""]);
  const [submissionStatus, setSubmissionStatus] = useState("N/A");

  const handleCohortChange = (e) => setCohort(e.target.value);

  const handleLineChange = (index, e) => {
    const newLines = [...linesData];
    newLines[index] = e.target.value;
    setLinesData(newLines);
  };

  const addFormLine = (e) => {
    e.preventDefault()
    setLinesData([...linesData, ""]);
  };

  const removeFormLine = (index) => {
    const newLines = [...linesData];
    newLines.splice(index, 1);
    setLinesData(newLines);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      date: new Date().toISOString(),
      cohort_id: cohort,
      lines: linesData.map((line) => ({ content: line })),
    };

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    };

    try {
      const fetchRes = await fetch("http://localhost:4000/log", opts);
      const data = await fetchRes.json();

      setSubmissionStatus(data.status);
      setLogsData([...logsData, data.data.log]);
    } catch (e) {
      setSubmissionStatus("fail");
    }

    setTimeout(() => {
      setLinesData([""]);
      setSubmissionStatus("N/A");
    }, 3000);
  };

  return (
      <div className="log-form">
      <div>
        <header><h2>Create New Log</h2></header>
        <form>
          <div>
            <select name="cohort" id="cohort" onChange={handleCohortChange}>
              <option value={""}>Please choose a cohort</option>
              {cohorts && cohorts.map((cohort) => (
                <option key={cohort.id} value={cohort.id}>{cohort.id}</option>
              ))}
            </select>
          </div>

          {linesData.map((line, index) => (
            <DeliveryLogFormLine
              key={index}
              index={index}
              value={linesData[index]}
              handleLineChange={handleLineChange}
              removeFormLine={removeFormLine}
            />
          ))}

          <div>
            <button className="log-form-btn" onClick={addFormLine}>Add Line</button>
            <button className="log-form-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </form>

        <p className="log-status">Submission Status:</p>
        <p>{submissionStatus}</p>
      </div>
    </div>
  );
}
