import { InputAdornment, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import client from '../../utils/client';
import EventList from './components/EventList';
import './style.css';
import EventFilter from './components/EventFilter';
import FilterMenu from '../posts/utils/filterMenu';

const rangeOptions = ['content', 'username', 'role'];

const DeveloperPage = () => {
  const [eventLogs, setEventLogs] = useState([]);
  const [authError, setAuthError] = useState(false);
  const [formValues, setFormValues] = useState({
    range: rangeOptions[0],
    content: '',
    types: [],
    sortBy: '',
  });
  const [sortType, setSortType] = useState('');
  const location = useLocation();

  useEffect(() => {
    const user = location.state.user;
    if (user.id === null || user.role !== 'DEVELOPER') {
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
    let url = `/events?`;
    if (formValues.content && formValues.range === 'content') {
      url += `content=${formValues.content}`;
    }

    if (formValues.types.length > 0) {
      formValues.types.map(type => {
        return (url += `&type=${type}`);
      });
    }

    if (formValues.range !== 'content') {
      if (formValues.range === 'role') {
        url += `&role=${formValues.content.toUpperCase()}`;
      } else {
        url += `&username=${formValues.content}`;
      }
    }

    if (sortType) {
      url += `&sorting=${sortType === 'Oldest' ? 'asc' : 'desc'}`;
    }
    return url;
  };

  const handleSubmit = () => {
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
  };

  const handleChange = e => {
    e.preventDefault();
    if (e.target) {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <main className="events-section">
      <h1>Events</h1>
      <form className="event-form" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <EventFilter
            formValues={formValues}
            setFormValues={setFormValues}
            handleSubmit={handleSubmit}
            sortType={sortType}
          />
        </div>
        <div className='sort_by_event'>
          <FilterMenu setSortType={setSortType} />
        </div>
        <div>
          <TextField
            id="standard-search"
            name="content"
            label="Search field"
            type="search"
            variant="standard"
            value={formValues.content}
            onChange={handleChange}
            onKeyPress={handleEnter}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <TextField
                    id="outlined-select-range"
                    select
                    name="range"
                    value={formValues.range}
                    onChange={handleChange}
                    sx={{ '& *': { border: 'none' } }}
                  >
                    {rangeOptions.map((option, index) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
      </form>
      <EventList eventLogs={eventLogs} />
    </main>
  );
};

export default DeveloperPage;
