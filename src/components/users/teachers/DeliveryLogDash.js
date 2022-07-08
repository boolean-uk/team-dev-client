import { useEffect, useState } from "react";
import DeliveryLogCreateForm from "./DeliveryLogCreateForm";
import DeliveryLog from "./DeliveryLog";
import Header from "../../Header/Header";
import client from "../../../utils/client";
import "./deliveryLog.css";

export default function DeliveryLogDash() {
  const [logsData, setLogsData] = useState([]);
  const [cohortsAvailable, setCohortsAvailable] = useState(null);

  useEffect(() => {
    client.get("/cohort")
      .then((res) => setCohortsAvailable(res.data.data))
      .catch((err) => console.error(err.message));

    client.get("/log")
      .then((res) => setLogsData(res.data.data))
      .catch((err) => console.error(err.message));
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
          <header>
            <h2>Logs</h2>
          </header>
          {logsData && logsData.map((log) => (
            <DeliveryLog key={log.id} data={log} />
          ))}
        </div>
      </div>
    </>
  );
}
