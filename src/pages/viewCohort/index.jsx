import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import client from '../../utils/client';
import Students from './components/Students';
import DeliveryLogs from './components/DeliveryLogs';

import './style.css';

const ViewCohort = () => {
  const [cohort, setCohort] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [newLog, setNewLog] = useState('')
  const cohortId = parseInt(useParams().cohortId);

  useEffect(() => {
    if (!isNaN(cohortId)) {
      client
        .get(`/cohort/${cohortId}`)
        .then(res => {
          setCohort(res.data.data.cohort);
          setIsLoading(false);
        })
        .catch(err => console.error('[FETCH /cohort/:id]', err));
    }
  }, [cohortId, newLog]);

  return (
    <div style={{ paddingInline: '10px' }}>
      <div className="view-cohort-container">
        {isLoading ? (
          <Spinner
            style={{
              position: 'absolute',
              right: '50%',
              top: '50%',
            }}
          />
        ) : (
          <>
            <h2>{cohort?.name}</h2>
            <div className="view-cohort-content">
              <Students {...{ cohort }} />
              <DeliveryLogs
                setNewLog={setNewLog}
                deliveryLogs={cohort.deliveryLogs}
                {...{ setCohort }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewCohort;
