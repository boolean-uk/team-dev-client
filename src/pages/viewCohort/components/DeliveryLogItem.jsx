import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Button, Input } from '@mui/material';

import DEFAULTIMG from '../../../assets/default.png';
import client from '../../../utils/client';
import { useLoggedInUser } from '../../../context/LoggedInUser';

const DeliveryLogItem = ({ log, setCohort }) => {
  const [newLine, setNewLine] = useState(false);
  const [lineValue, setLineValue] = useState('');
  const [logLines, setLogLines] = useState(log.lines);
  const { user } = useLoggedInUser();

  const formatDate = new Date(log.date);
  const date = formatDate.toLocaleString();
  const isAuthor = log?.userId === user?.id;

  const handleLineChange = e => {
    setLineValue(e.target.value);
  };

  const handleBlur = () => {
    client
      .post('/log/line', { logId: log.id, content: lineValue })
      .then(res => {
        const newLine = res.data.data.line;
        setLogLines(curr => [...logLines, newLine]);
        setLineValue('');
        setNewLine(false);
      })
      .catch(err => console.error(['error'], err));
  };

  const handleDeleteLine = id => {
    client
      .delete(`/log/line/${id}`)
      .then(res => {
        if (res.data.status === 'success') {
          setLogLines(curr => curr.filter(line => line.id !== id));
        }
      })
      .catch(err => console.error(['error'], err));
  };

  const handleDeleteLog = id => {
    client
      .delete(`/log/${id}`)
      .then(res => {
        if (res.data.status === 'success') {
          setCohort(curr => {
            const filteredLogs = curr.deliveryLogs.filter(log => log.id !== id);
            return { ...curr, deliveryLogs: filteredLogs };
          });
        }
      })
      .catch(err => console.error(['error'], err));
  };

  return (
    <li className="view-cohort__log-card">
      <div className="view-cohort__log-card-user">
        <img
          className="view-cohort__profile-image"
          src={log?.user?.profile.profileImageUrl || DEFAULTIMG}
          alt="Profile"
        />
        <div className="view-cohort__user-text">
          <span style={{ marginRight: '8px' }}>
            {log?.user?.profile.firstName}
          </span>
          <span>{log?.user?.profile.lastName}</span>
          <p className="view-cohort__user-email">{date}</p>
        </div>
      </div>

      <ul className="logs-list">
        {logLines?.map(line => (
          <li
            className="log-list-item"
            key={`${line.id}${line.content}`}
            tabIndex="0"
          >
            <span>{line?.content}</span>
            {isAuthor && (
              <DeleteForeverIcon
                className="log-list-item-delete"
                tabIndex="0"
                onClick={() => handleDeleteLine(line.id)}
              />
            )}
          </li>
        ))}
        <li>
          {newLine ? (
            <Input
              type="text"
              autoFocus
              onBlur={handleBlur}
              onChange={handleLineChange}
              value={lineValue}
              placeholder="Enter new line..."
              sx={{ marginLeft: '15px' }}
            />
          ) : (
            isAuthor && (
              <Button onClick={() => setNewLine(true)}>
                <AddIcon />
                <span>New Line</span>
              </Button>
            )
          )}
        </li>
      </ul>
      {isAuthor && (
        <Button sx={{ marginTop: 5 }} onClick={() => handleDeleteLog(log.id)}>
          Delete Log
        </Button>
      )}
    </li>
  );
};

export default DeliveryLogItem;
