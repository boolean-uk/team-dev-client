import { Button } from '@mui/material';

import DeliveryLogItem from './DeliveryLogItem';

const DeliveryLogs = ({ cohort }) => {
  // console.log(cohort);
  const date = new Date();

  const deliveryLogs = [
    {
      id: 1,
      date: date.toLocaleDateString(),
      author: { firstName: 'Test', lastName: 'Surname' },
      lines: [
        { id: 1, content: 'my first line' },
        { id: 2, content: 'my second line' },
      ],
    },
  ];
  return (
    <div>
      <div className="view-cohort-logs-header">
        <h3>Logs</h3>
        <Button variant="contained">Create Log</Button>
      </div>
      <ul>
        {deliveryLogs?.length === 0 ? (
          <li>
            <p>No Logs</p>
          </li>
        ) : (
          deliveryLogs?.map(log => (
            <DeliveryLogItem key={log.id} {...{ log }} />
          ))
        )}
      </ul>
    </div>
  );
};

export default DeliveryLogs;
