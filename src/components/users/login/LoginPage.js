import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import UserForm from './UserForm'
import userBlankData from '../utils/userHelpers'
import client from '../../../utils/client'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState(userBlankData())
  const [loginResponse, setLoginResponse] = useState({ data: { token: "", user: {} }})
  let navigate = useNavigate();

  useEffect(() => {
    const loadedToken = localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ""
    setLoginResponse({ data: { token: loadedToken }})
  }, [])

  const loginUser = (event) => {
    event.preventDefault()
    client.post('/login', user)
      .then(res => {
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, res.data.data.token)
        setLoginResponse(res.data)
        console.log(res.data)
        navigate("../posts", { replace: true });
      })
      .catch(err => console.log(err.response))
  }


// function getListOfCohorts() {
//   const options = {
//     headers: {
//       "content-type": "application/json",
//       "Authorization": "Bearer " + localStorage.getItem("jwt")
//     },
//   }
//   client.get('/', options)
//   .then((res) => res.json())
//   .then((data) => console.log(data))
// }


  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setUser({
      ...user,
      [name]: value,
    });
  }

  return(
    <div className="login-page">
      <Link id="user-registration-link" to="/signup">sign up</Link> <Link id="user-login-link" to="/">login</Link>
      <h1>Login</h1>
      <p>Status: {loginResponse.status}</p>
      <UserForm handleChange={handleChange} handleSubmit={loginUser} />
    </div>
  )
}

export default LoginPage;
