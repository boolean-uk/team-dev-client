import { Link } from "react-router-dom";
import { useState } from "react";
import UserForm from './UserForm'
import userBlankData from '../utils/userHelpers'
import client from '../../../utils/client'
import './style.css'

const RegistrationPage = () => {
  const [user, setUser] = useState(userBlankData())
  const [registerResponse, setRegisterResponse] = useState("")

  const registerUser = (event) => {
    event.preventDefault()
    client.post('/user', user, false)
      .then(res => setRegisterResponse(res.data))
      .catch(err => console.log(err.response))
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <div className="registration-page">
      <Link id="user-registration-link" to="/signup">sign up!</Link> <Link id="user-login-link" to="/">login!</Link>
      <h1>Sign up</h1>
      <p>Status: {registerResponse.status}</p>
      <UserForm handleChange={handleChange} handleSubmit={registerUser} />
    </div>
  )
}

export default RegistrationPage;
