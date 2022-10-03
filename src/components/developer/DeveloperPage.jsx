import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../../utils/client';
import EventList from './EventList';
import './style.css';
const initLog = [
  {
    id: null,
    type: '',
    topic: '',
    receivedById: '',
    createdAt: '',
    updatedAt: ''
  }
]

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
      client
      .get(`/events`)
      .then(res => {
          console.log('res', res.data)
          setEventLogs(res.data.data);
          setAuthError(false);
      })
      .catch(err => {
          console.error(err.response);
          setAuthError(true);
          setTimeout(() => {
          setAuthError(false);
          }, '3000');
      });
      //eslint-disable-next-line
    }, [location]);

  return (
    <main className='events-section'>
      <h2>Events</h2>
      <EventList eventLogs={eventLogs} />
    </main> 
  )
}

export default DeveloperPage;