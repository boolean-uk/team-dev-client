import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import './style.css';

const EditDetails = ({ user, handleSubmit, handleChange }) => {
  const { email } = user;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change Email
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h1 className="dialog-title">Change Email</h1>
        <DialogContent>
          <form className="user-form" onSubmit={handleSubmit}>
            <TextField
              className="user-form-input"
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              placeholder={email}
              onChange={handleChange}
            />
            <Button
              onClick={handleClose}
              id="user-submit-button"
              type="submit"
              variant="contained"
            >
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditDetails;
