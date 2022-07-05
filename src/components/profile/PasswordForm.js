import TextField from "@mui/material/TextField"
import { useState } from "react";
import Button from "@mui/material/Button";
import '../profile/passwordform.css'


const PasswordForm = ({userData}) => {
    
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      });

    const handlePasswordChange = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        setPasswords({
          ...passwords,
          [name]: value,
        });
      };
    
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        const { newPassword, newPasswordConfirmation } = passwords;
    
        if (newPassword !== newPasswordConfirmation) {
          return;
        }
      };
    return(
        <form className="password-form">
          <TextField
            className='password-input'
            type='text'
            label='current password'
            name='currentPassword'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <TextField
            className='password-input'
            type='text'
            label='new password'
            name='newPassword'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <TextField
            className='password-input'
            type='text'
            label='new password'
            name='newPasswordConfirmation'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <Button
            id='user-submit-button'
            onClick={handlePasswordSubmit}
            type='submit'
            variant='contained'
          >
            Submit
          </Button>
        </form>
    )
}
export default PasswordForm