import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import UserForm from './UserForm';
import userBlankData from '../utils/userHelpers';
import client from '../../../utils/client';
import { useNavigate } from 'react-router-dom';
import { loggedInUserContext } from '../../../Helper/loggedInUserContext';

const LoginPage = () => {
  const { setLoggedInUser } = useContext(loggedInUserContext);
  const [user, setUser] = useState(userBlankData());
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  
  const loginUser = (event) => {
    event.preventDefault();
    client
      .post('/login', user)
      .then((res) => {
        localStorage.setItem(
          process.env.REACT_APP_USER_TOKEN,
          res.data.data.token
        );
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify(res.data.data.user)
        );
        setLoggedInUser(res.data.data.user);
        navigate('../home', { replace: true });
      })
      .catch((err) => {
        setLoginError(err.response.data.data.email);
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
      <Link id='user-login-link' to='/'>
        login
      </Link>
      <h1>Login</h1>
      <UserForm
        loginError={loginError}
        handleChange={handleChange}
        handleSubmit={loginUser}
      />
    </div>
  );
};

export default LoginPage;
