import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../../utils/client';
import EventList from './components/EventList';
import './style.css';
import EventFilter from './components/EventFilter';
import FilterMenu from '../posts/utils/filterMenu';

const DeveloperPage = () => {
    const [eventLogs, setEventLogs] = useState([])
    const [authError, setAuthError] = useState(false)
    const [formValues, setFormValues] = useState({ 
      content: '',
      types: [],
      sortBy: '',
    });
    const [sortType, setSortType] = useState('')
    const location = useLocation();

    useEffect(() => {
      const user = location.state.user;
      if (user.id === null || user.role !== 'DEVELOPER') {
          console.log('test', user)
      return;
      }
      client
      .get(`/events`)
      .then(res => {
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

    const createUrl = () => {
      let url = `/events?`
      
      if (formValues.content) {
        url += `content=${formValues.content}`
      }

      if (formValues.types.length > 0) {
        formValues.types.map((type) => {
          url += `&type=${type}`
        })
      }

      if (sortType) {
        url += `&sorting=${sortType === 'Oldest' ? 'asc' : 'desc'}`
      }
      return url
    }

    const handleSubmit = e => {
      client
      .get(createUrl())
      .then(res => {
          setEventLogs(res.data.data);
          console.log('hi', res.data.data)
          setAuthError(false);
      })
      .catch(err => {
          console.error(err.response);
          setAuthError(true);
          setTimeout(() => {
          setAuthError(false);
          }, '3000');
      });
      console.log('hi')
    }

    const handleChange = e => {
      e.preventDefault();
      if (e.target.name === 'search') {
        setFormValues({...formValues, content: e.target.value})
      }
      console.log(createUrl())
    }

    const handleEnter = e => {
      if (e.key === 'Enter') {
        handleSubmit(e)
      }
    }

  return (
    <main className='events-section'>
      <h2>Events</h2>
      <form className='event-form' onSubmit={handleSubmit} autoComplete='off' >
        <EventFilter
         formValues={formValues} 
         setFormValues={setFormValues}
         handleSubmit={handleSubmit}
         sortType={sortType}
        />
        <FilterMenu setSortType={setSortType} />
        <TextField
          id='standard-search'
          name='search'
          label='Search field'
          type='search'
          variant='standard'
          value={formValues.content}
          onChange={handleChange}
          onKeyPress={handleEnter}
        />
      </form>
      <EventList eventLogs={eventLogs} />
    </main> 
  )
}

export default DeveloperPage;