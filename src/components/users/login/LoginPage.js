import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import userBlankData from '../utils/userHelpers';
import client from '../../../utils/client';
import { useNavigate } from 'react-router-dom';
import storage from '../../../utils/storage';

const LoginPage = ({ token, setLoggedInUser }) => {
  const [user, setUser] = useState(userBlankData());
  const [loginResponse, setLoginResponse] = useState({
    data: { token: '', user: {} },
  });
  const [loginError, setLoginError] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const loadedToken = token || '';
    setLoginResponse({ data: { token: loadedToken } });
  }, []);
  const loginUser = (event) => {
    event.preventDefault();
    client
      .post('/login', user)
      .then((res) => {
        storage.saveStorage(res.data.data.token, res.data.data.user.id, res.data.data.user.role);
        setLoginResponse(res.data);
        setLoggedInUser(storage.loadStorage());
        navigate('../', { replace: true });
      })
      .catch((err) => {
        console.log(err.response);
        const errorMessage = err.response.data.data.email;
        setLoginError(errorMessage);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className='login-page'>
      <div>
        <h1>Cohort Manager 2.0</h1>
      </div>
      <Link id='user-registration-link' to='/signup'>
        sign up
      </Link>
      <Link id='user-login-link' to='/login'>
        login
      </Link>
      <h1>Login</h1>
      <p>Status: {loginResponse.status}</p>
      <UserForm
        handleChange={handleChange}
        handleSubmit={loginUser}
        loginError={loginError}
      />
    </div>
  );
};

export default LoginPage;
