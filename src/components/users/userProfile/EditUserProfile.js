import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { useState, useEffect } from "react";
import client from "../../../utils/client";
import { useParams } from "react-router-dom";

const UserForm = ({ handleSubmit, handleChange }) => {
  // when changing the password we want to type in original password and email before changing
  // we also want the option to change some fields as opposed to all

  // we need to decide as a team how we're gunna implement the above
  // initial get request to load user details,
  //use state
  // value set to state or placeholder

    const [profile, setProfile] = useState('');
    const { id } = useParams();

    useEffect(() => {
      handleFindProfile();
    }, []);

    console.log(id);

    const handleFindProfile = () => {
      client
        .get(`/user/${id}`)
        .then((res) => {
          setProfile(res.data.data.user);
        })
        .catch((err) => console.log(err.response));
    };

    // logic for updating user 

   // const editUser = (event) => {
   //     event.preventDefault()
   //     client.patch('/user', user, false)
   //       .then(res => setRegisterResponse(res.data))
   //       .catch(err => console.log(err.response))
   //   }
   // 
   //   const handleChange = (event) => {
   //     event.preventDefault()
   //     const { value, name } = event.target
   // 
   //     setProfile({
   //       ...profile,
   //      [name]: value,
   //    });
   //  }

   const onFirstNameChange = (e) => {
    setProfile([...profile, {first_name : e.target.value }]);
  };
    
   const onSubmit = (e) => {
   e.preventDefault()

   const options ={
     method: 'PATCH',
      headers: {
       'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      first_Name: profile.first_name,
      last_Name: profile.last_name,
      email: profile.email,
      biography: profile.biography,
      github_url: profile.github_url,
    })
   }
   fetch(`/users/${id}`, options)
   .then(res => {
    setProfile(res.data.data.user)
})
.catch(err => console.log(err.response))
};
  

    return (
      <div>
        <h1> Edit Profile Details </h1>
      <br>
      </br> 
      <form onSubmit={onSubmit} className="user-form">
        <TextField
          className="user-form-input"
          value= {profile.first_name}
          variant="outlined"
          name="first_name"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          value= {profile.last_name}
          variant="outlined"
          name="last_name"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="email"
          value= {profile.email}
          variant="outlined"
          name="email"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          value= {profile.biography}
          variant="outlined"
          name="biography"
          onChange={handleChange}
        />
        <TextField
          className="user-form-input"
          type="url"
          value= {profile.github_url}
          variant="outlined"
          name="github_url"
          onChange={handleChange}
        />
        <Button id="user-submit-button" type="submit" variant="contained">
          Submit
        </Button>
      </form>

      </div>
      
    );
  };



export default UserForm;
