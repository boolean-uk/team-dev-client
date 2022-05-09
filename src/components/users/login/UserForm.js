import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserForm = ({handleSubmit, handleChange, loginError}) => {

  return(
    <form className="user-form" onSubmit={handleSubmit}>
      <TextField className="user-form-input" type="email" label="Email" variant="outlined" name="email" onChange={handleChange} />
      <TextField className="user-form-input" type="password" label="Password" variant="outlined" name="password" onChange={handleChange} />
      {loginError && <p className="login-error">{loginError}</p>}
      <Button id="user-submit-button" type="submit" variant="contained">Submit</Button>
    </form>
  );
};

export default UserForm;
