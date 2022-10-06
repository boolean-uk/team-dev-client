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
    const [allLogs, setAllLogs] = useState([])
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
          setAllLogs(res.data.data);
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
      
      if (formValues.content && formValues.range === 'content') {
        url += `content=${formValues.content}`
      }

      if (formValues.types.length > 0) {
        formValues.types.map((type) => {
          return url += `&type=${type}`
        })
      }

      if(formValues.range !== 'content') {
        if (formValues.range === 'role') {
          url += `role=${formValues.content}`
        }
        else {
          url += `firstName=${formValues.content}`
        }
      }

      if (sortType) {
        url += `&sorting=${sortType === 'Oldest' ? 'asc' : 'desc'}`
      }
      return url
    }

    const handleSubmit = e => {
      if (formValues.range && formValues.range !== 'content' && formValues.content !== '') {
        getEvents()
      } else getEvents()
    }

    // const searchByRange = () => {
    //   client
    //     .get(createUrl())
    //     .then(res => {
    //       setEventLogs(res.data.data);
    //       setAuthError(false);
    //   })
    //   .catch(err => {
    //       console.error(err.response);
    //       setAuthError(true);
    //       setTimeout(() => {
    //       setAuthError(false);
    //       }, '3000');
    //   });
    // }

    const getEvents = () => {
      client
      .get(createUrl())
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
    }

    // const searchByRange = () => {
    //   console.log('searching by range...')
    //   const logsByRange = allLogs.filter((event) => {
    //     console.log('event', event)
    //     switch (formValues.range) {
    //       case 'username':
    //         const usernames = [
    //           event.receivedBy?.profile.firstName,
    //           event.receivedBy?.profile.lastName,
    //           event.createdBy?.profile.firstName,
    //           event.createdBy?.profile.lastName,
    //         ]
    //         for (let i = 0; i < usernames.length; i++) {
    //           const name = usernames[i];
    //           // if (name) {
    //             if (name && name.toUpperCase().includes(formValues.content.toUpperCase())) {
    //               return true
    //             }
    //           // }
    //           return false
    //         }
    //       break;
    //       case 'role':
    //         const roles = [
    //           event.createdBy?.role,
    //           event.receivedBy?.role,
    //         ]
    //         console.log('receivedBy', roles[1])
    //         for (let i = 0; i < roles.length; i++) {
    //           const role = roles[i];
    //           if (role && role.toUpperCase().includes(formValues.content.toUpperCase())) {
    //             console.log('role', role)
    //             return true
    //           }
    //           return false
    //         }
    //         break;
    //       default:
    //       break;
    //     }
    //   });
    //   setEventLogs(logsByRange)
    // }

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
      <button onClick={() => {console.log(createUrl())}}>TEST</button>
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