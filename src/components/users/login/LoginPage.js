import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';

import userBlankData from '../utils/userHelpers';
import UserForm from './UserForm';
import client from '../../../utils/client';

const LoginPage = () => {
  const location = useLocation()
  const [user, setUser] = useState(userBlankData());
  const [successLogin, setSuccessLogin] = useState({
    data: { token: '', user: {} },
  });
  let navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    const loadedToken =
      localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || '';
    setSuccessLogin({ data: { token: loadedToken } });
  }, []);

  const loginUser = event => {
    event.preventDefault();
    client
      .post('/login', user)
      .then(res => {
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );

        setSuccessLogin(res.data);

        navigate('../posts', {
          replace: true,
        });
      })
      .catch(err => {
        console.error(err.response);
        setErrorLogin(true);
        setTimeout(() => {
          setErrorLogin(false);
        }, '2000');
      });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="login-page">
      <div>
        <h1>Cohort Manager 2.0</h1>
      </div>
      <Link id="user-registration-link" to="/signup">
        sign up
      </Link>
      <Link id="user-login-link" to="/">
        login
      </Link>
      <h1>Login</h1>
      <p>Status: {successLogin.status}</p>
      <UserForm handleChange={handleChange} handleSubmit={loginUser} />
      {location.state !== null && location.state.token === 'expired' && (
        <Alert severity="error">Your session has expired. Please login again.</Alert>
      )}
      {errorLogin && (
        <Alert severity="error">Email or Password is incorrect</Alert>
      )}
    </div>
  );
};

export default LoginPage;
