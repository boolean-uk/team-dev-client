import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import UserForm from "./UserForm"
import userBlankData from "../utils/userHelpers"
import client from "../../../utils/client"
import "./style.css"

const RegistrationPage = () => {
  const [user, setUser] = useState(userBlankData())
  const [registerResponse, setRegisterResponse] = useState("")
  const [registrationError, setRegistrationError] = useState(null)
  const [radioButtonValue, setRadioButtonValue] = useState("STUDENT")

  const registerUser = (event) => {
    event.preventDefault()
    client
      .post("/user", user, false)
      .then((res) => setRegisterResponse(res.data))
      .catch((err) => {
        const errorMessage = err.response.data.data.email
        console.log(err.response.data.data.email)
        setRegistrationError(errorMessage)
      })
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleFilter = (event) => {
    const inputValue = event.target.value
    setRadioButtonValue(inputValue)
    console.log(radioButtonValue)
    setUser({ ...user, role: radioButtonValue })
  }

  return (
    <div className="registration-page">
      <div>
        <h1>Cohort Manager 2.0</h1>
      </div>
      <Link id="user-registration-link" to="/signup">
        sign up
      </Link>{" "}
      <Link id="user-login-link" to="/login">
        login
      </Link>
      <h1>Sign up</h1>
      <p>Status: {registerResponse.status}</p>
      <UserForm
        handleChange={handleChange}
        handleSubmit={registerUser}
        handleFilter={handleFilter}
        radioButtonValue={radioButtonValue}
        registrationError={registrationError}
      />
    </div>
  )
}

export default RegistrationPage
