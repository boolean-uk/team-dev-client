import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import './style.css';
import client from '../../utils/client';
import { useLoggedInUser } from '../../context/LoggedInUser';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DeactivateForm = () => {
  const loggedInUser = useLoggedInUser().user;
  const [open, setOpen] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);
  const [errorLoginCheck, setErrorLoginCheck] = useState(false);
  const [successDeactivate, setSuccessDeactivate] = useState(false);
  const [errorDeactivate, setErrorDeactivate] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setConfirmDeactivate(false);
    setLoginDetails({});
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmitLoginDetails = e => {
    e.preventDefault();

    client
      .post(`/user/${loggedInUser.id}`, loginDetails)
      .then(res => {
        if (res.status === 200) {
          setConfirmDeactivate(true);
          setLoginDetails({});
        }
      })
      .catch(err => {
        console.error('error: ', err);
        setErrorLoginCheck(true);
        setTimeout(() => {
          setErrorLoginCheck(false);
        }, '3000');
      });
  };

  const handleConfirmDeactivate = e => {
    e.preventDefault();

    client
      .patch(`/user/${loggedInUser.id}`, { isActive: false })
      .then(res => {
        if (res.status === 201) {
          setSuccessDeactivate(true);
          setTimeout(() => {
            localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
            navigate('../', { replace: true });
          }, '3000');
        }
      })
      .catch(err => {
        console.error('error: ', err);
        setErrorDeactivate(true);
        setTimeout(() => {
          setErrorDeactivate(false);
        }, '3000');
      });
  };

  return (
    <div>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Deactivate Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {confirmDeactivate ? (
          <>
            <div className="dialog-instruction">
              <p>Login details are valid</p>
              <p>Do you confirm deactivating your account?</p>
            </div>
            {successDeactivate && (
              <Alert
                sx={{ maxWidth: 'fit-content', margin: 'auto' }}
                severity="success"
              >
                Your account has been deactivated
              </Alert>
            )}
            {errorDeactivate && (
              <Alert
                sx={{ maxWidth: 'fit-content', margin: 'auto' }}
                severity="error"
              >
                Failed to deactivate the account
              </Alert>
            )}
            <div className="deactivate-buttons-wrap">
              <Button
                id="user-submit-button"
                onClick={handleConfirmDeactivate}
                color="error"
                variant="contained"
                disabled={successDeactivate}
              >
                Confirm
              </Button>
              <Button
                id="user-submit-button"
                onClick={handleClose}
                variant="contained"
                disabled={successDeactivate}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="dialog-instruction">
              <p>
                Your account will be{' '}
                <span className="dialog-warning">deactivated</span>
              </p>
              <p>Please enter your login details to confirm</p>
            </div>
            {errorLoginCheck && (
              <Alert
                sx={{ maxWidth: 'fit-content', margin: 'auto' }}
                severity="error"
              >
                Login details are invalid
              </Alert>
            )}
            <DialogContent>
              <form className="user-form" onSubmit={handleSubmitLoginDetails}>
                <TextField
                  className="user-form-input"
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={loginDetails.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  className="user-form-input"
                  label="Password"
                  type="password"
                  variant="outlined"
                  name="password"
                  value={loginDetails.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  id="user-submit-button"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </form>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default DeactivateForm;
