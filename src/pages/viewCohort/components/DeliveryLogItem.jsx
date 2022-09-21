import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import { Button, Input } from '@mui/material';

import DEFAULTIMG from '../../../assets/default.png';

const DeliveryLogItem = ({ log }) => {
  const [newLine, setNewLine] = useState(false);
  const [lineValue, setLineValue] = useState('');

  const handleLineChange = e => {
    setLineValue(e.target.value);
  };

  const handleBlur = () => {
    // submit line
    console.log(lineValue);
    setLineValue('');
    setNewLine(false);
  };

  return (
    <li className="view-cohort__log-card">
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
            <DeleteForeverIcon className="log-list-item-delete" tabIndex="0" />
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
              sx={{ marginLeft: '15px' }}
            />
          ) : (
            <Button onClick={() => setNewLine(true)}>
              <AddIcon />
              <span>New Line</span>
            </Button>
          )}
        </li>
      </ul>
      <Button sx={{ marginTop: 5 }}>Delete Log</Button>
    </li>
  );
};

export default DeliveryLogItem;
