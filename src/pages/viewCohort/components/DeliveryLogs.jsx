import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import DEFAULTIMG from '../../../assets/default.png';

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
            <li key={log.id} className="view-cohort__log-card">
              <div className="view-cohort__log-card-user">
                <img
                  className="view-cohort__profile-image"
                  src={log.author.profileImageUrl || DEFAULTIMG}
                  alt="Profile"
                />
                <div className="view-cohort__user-text">
                  <span style={{ marginRight: '8px' }}>
                    {log.author.firstName || 'firstname'}
                  </span>
                  <span>{log.author.lastName || 'lastname'}</span>
                  <p className="view-cohort__user-email">{log.date}</p>
                </div>
              </div>

              <ul className="logs-list">
                {log?.lines?.map(line => (
                  <li
                    className="log-list-item"
                    key={`${line.id}${line.content}`}
                    tabIndex="0"
                  >
                    <span>{line.content}</span>
                    <DeleteForeverIcon
                      className="log-list-item-delete"
                      tabIndex="0"
                    />
                  </li>
                ))}
                <li>
                  <Button>
                    <AddIcon />
                    <span>New Line</span>
                  </Button>
                </li>
              </ul>
              <Button sx={{ marginTop: 5 }}>Delete Log</Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default DeliveryLogs;
