import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import client from '../utils/client';

const LoggedInUser = createContext();

export const useLoggedInUser = () => useContext(LoggedInUser);

const LoggedInUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);

  useEffect(() => {
    if (token) {
      const { userId } = jwtDecode(token);

      client
        .get(`/user/${userId}`)
        .then(res => setUser(res.data.data.user))
        .catch(err => console.log('[User Error]', err));
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <LoggedInUser.Provider value={{ user }}>{children}</LoggedInUser.Provider>
  );
};

export default LoggedInUserProvider;
