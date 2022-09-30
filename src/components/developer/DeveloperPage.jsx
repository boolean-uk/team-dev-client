import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../../utils/client';
import EventList from './EventList';
import './style.css';

const DeveloperPage = () => {
    const [eventLogs, setEventLogs] = useState([])
    const [authError, setAuthError] = useState(false)
    const location = useLocation();
    console.log(location.state)
    console.log('log array',eventLogs)

    useEffect(() => {
        const user = location.state.user;
        if (user.id === null || user.role !== 'DEVELOPER') {
            console.log('test', user)
        return;
        }
        setEventLogs([
            {
              id: 1,
              type: 'USER',
              topic: 'registration ',
              receivedById: 1,
              createdAt: '2022-09-28T15:56:45.683Z',
              updatedAt: '2022-09-28T15:56:45.684Z'
            },
            {
              id: 2,
              type: 'COHORT',
              topic: 'created ',
              createdById: 1,
              cohortId: 1, 
              createdAt: '2022-09-28T15:56:45.766Z',
              updatedAt: '2022-09-28T15:56:45.767Z'
            },
            {
              id: 3,
              type: 'COHORT',
              topic: 'assigned ',
              createdById: 13,
              receivedById: 11,
              cohortId: 1, 
              createdAt: `${new Date()}`,
              updatedAt: `${new Date()}`
            }
          ])
        // client
        // .get(`/events`)
        // .then(res => {
        //     console.log('res', res)
        //     setEventLogs(res.data);
        //     setAuthError(false);
        // })
        // .catch(err => {
        //     console.error(err.response);
        //     setAuthError(true);
        //     setTimeout(() => {
        //     setAuthError(false);
        //     }, '3000');
        // });
        // eslint-disable-next-line
    }, [location]);

  return (
    <main className='events-section'>
        <EventList eventLogs={eventLogs} />
    </main> 
  )
}

export default DeveloperPage;