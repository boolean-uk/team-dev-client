import { useState } from 'react';
import { useEffect } from 'react';
import client from '../../../utils/client';
import UserListItem from './UserListItem';
import './style.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [cohorts, setCohorts] = useState([{ cohort_id: 1 }, { cohort_id: 2 }]);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   client
  //     .get('/user')
  //     .then(res => setCohorts(res.data.data.cohorts))
  //     .catch(err => setError('error'));
  // }, []);

  useEffect(() => {
    client
      .get('/user')
      .then(res => setUsers(res.data.data.users))
      .catch(err => setError('error'));
  }, []);

  return (
    <>
      {error ? (
        <h2>Something went wrong</h2>
      ) : (
        <div>
          {users.map(user => (
            <UserListItem {...user} cohorts={cohorts} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
