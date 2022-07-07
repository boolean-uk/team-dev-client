import React, { useState } from "react";
import DeliveryLogFormLine from "./DeliveryLogFormLine";
import client from "../../../utils/client";

export default function DeliveryLogCreateForm({ cohorts, logsData, setLogsData }) {
  const [cohort, setCohort] = useState();
  const [linesData, setLinesData] = useState([""]);

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

    const data = {
      date: new Date().toISOString(),
      cohort_id: cohort,
      lines: linesData.map((line) => ({ content: line })),
    };

    const response = await client.post("/log", data)
      .catch((err) => console.error(err))

    const id = response.data.data.deliveryLog.id
    
    const deliveryLogFullInfo = await client.get(`/log/${id}`)
      .catch((err) => console.error(err))

    setLogsData([...logsData, deliveryLogFullInfo.data.data]);
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
      </div>
    </div>
  );
}
