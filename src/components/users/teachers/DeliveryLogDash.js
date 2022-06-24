import { useEffect, useState } from "react";
import DeliveryLogCreateForm from "./DeliveryLogCreateForm";
import DeliveryLog from "./DeliveryLog"
import Header from "../../Header/Header"
import client from "../../../utils/client";
import "./deliveryLog.css"

export default function DeliveryLogDash() {
  const [logsData, setLogsData] = useState([]);
  const [cohortsAvailable, setCohortsAvailable] = useState(null);

  useEffect(() => {
    client.get("/cohort")
      .then(res => setCohortsAvailable(res.data.data))
  }, []);

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className="deliveryLog-dashboard">
      <DeliveryLogCreateForm
        cohorts={cohortsAvailable}
        logsData={logsData}
        setLogsData={setLogsData}
      />
      <div className="deliveryLog-existingLogs">
        <header><h2>Logs</h2></header>
        {logsData.map((log, i) => (
          <DeliveryLog key={log.id} data={logsData[i]} />
        ))}
      </div>
    </div>
    </>
  );
}
