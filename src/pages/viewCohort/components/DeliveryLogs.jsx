import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import client from '../../../utils/client';

import DeliveryLogItem from './DeliveryLogItem';

const DeliveryLogs = ({ setCohort, deliveryLogs }) => {
  const { cohortId } = useParams();

  const handleCreateLog = () => {
    client
      .post('/log', { cohortId })
      .then(res => {
        const newLog = res.data.data.log;
        setCohort(curr => {
          return { ...curr, deliveryLogs: [newLog, ...curr.deliveryLogs] };
        });
      })
      .catch(err => console.error('[error]', err));
  };

  return (
    <div>
      <div className="view-cohort-logs-header">
        <h3>Logs</h3>
        <Button variant="contained" onClick={handleCreateLog}>
          Create Log
        </Button>
      </div>
      <ul>
        {deliveryLogs?.length === 0 ? (
          <li>
            <p>No Logs</p>
          </li>
        ) : (
          deliveryLogs?.map(log => (
            <DeliveryLogItem key={log.id} {...{ log, setCohort }} />
          ))
        )}
      </ul>
    </div>
  );
};

export default DeliveryLogs;
