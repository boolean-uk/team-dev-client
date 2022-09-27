import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import './style.css';

const EditForm = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false);
  const [newInfo, setNewInfo] = useState({})
  const { first_name, last_name, biography, github_url, profile_image_url } = newInfo;

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false)

  const handleUpdate = (event) => {
    event.preventDefault();

    handleSubmit(newInfo)
    handleClose()
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setNewInfo({
      ...newInfo,
      [name]: value,
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h1 className="dialog-title">Edit Profile</h1>
        <DialogContent>
          <form className="user-form" onSubmit={handleUpdate}>
            <TextField
              className="user-form-input"
              label="First Name"
              variant="outlined"
              name="first_name"
              placeholder={first_name}
              onChange={handleChange}
            />
            <TextField
              className="user-form-input"
              label="Last Name"
              variant="outlined"
              name="last_name"
              placeholder={last_name}
              onChange={handleChange}
            />
            <TextField
              className="user-form-input"
              label="Bio"
              variant="outlined"
              name="biography"
              placeholder={biography}
              onChange={handleChange}
            />
            <TextField
              className="user-form-input"
              type="url"
              label="Profile Pic URL"
              variant="outlined"
              name="profile_image_url"
              placeholder={profile_image_url}
              onChange={handleChange}
            />
            <TextField
              className="user-form-input"
              type="url"
              label="GitHub URL"
              variant="outlined"
              name="github_url"
              placeholder={github_url}
              onChange={handleChange}
            />
            <Button
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

export default EditForm;
