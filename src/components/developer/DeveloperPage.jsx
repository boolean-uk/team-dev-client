import { InputAdornment, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../../utils/client';
import EventList from './components/EventList';
import './style.css';
import EventFilter from './components/EventFilter';
import FilterMenu from '../posts/utils/filterMenu';

const rangeOptions = ['content', 'username', 'role']

const DeveloperPage = () => {
    const [eventLogs, setEventLogs] = useState([])
    const [authError, setAuthError] = useState(false)
    const [formValues, setFormValues] = useState({
      range: rangeOptions[0],
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
          console.log('events', res.data);
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
          return url += `&type=${type}`
        })
      }

      if (sortType) {
        url += `&sorting=${sortType === 'Oldest' ? 'asc' : 'desc'}`
      }
      return url
    }

    const handleSubmit = e => {
      if (formValues.range && formValues.range !== 'content') {
        searchByRange()
      } else getEvents()
    }

    const getEvents = () => {
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
    }

    const searchByRange = () => {
      console.log('searching by range...')
      // const logsByRange = eventLogs.filter((event) => {
      //   if (formValues.range === 'username') {
      //     event.
      //   }
      // })
    }

    const handleChange = e => {
      e.preventDefault();
      if (e.target) {
        setFormValues({...formValues, [e.target.name]: e.target.value})
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
          name='content'
          label='Search field'
          type='search'
          variant='standard'
          value={formValues.content}
          onChange={handleChange}
          onKeyPress={handleEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <TextField
                  id="outlined-select-range"
                  select
                  name='range'
                  value={formValues.range}
                  onChange={handleChange}
                  sx={{ '& *': { border: 'none' } }}
                >
                  {rangeOptions.map((option, index) => (
                    <MenuItem key={option} value={option} >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </InputAdornment>
            ),
          }}
        >
        </TextField>
      </form>
      <EventList eventLogs={eventLogs} />
    </main> 
  )
}

export default DeveloperPage;