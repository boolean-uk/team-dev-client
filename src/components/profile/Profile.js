import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../Header/Header";
import client from "../../utils/client";
import "./profile.css";

const Profile = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const params = useParams();
  const [userData, setUserData] = useState({});
  const [cohortsAvailable, setCohortsAvailable] = useState([]);

  useEffect(() => {
    client
      .get(`/user/${params.id}`)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.error(err.response));
  }, [params]);

  useEffect(() => {
    client
      .get("/cohort")
      .then((res) => {
        console.log("hellooooo", res.data.data);
        setCohortsAvailable(res.data.data);
      })
      .catch((err) => console.error(err.response));
  }, []);

  const handleSubmitAddStudentToCohort = (e) => {
    e.preventDefault();

    const selectedCohortId = Number(e.target[0].value);

    client.patch(`/user/${userData.id}`, { cohort_id: selectedCohortId });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;

    if (editingProfile) {
      setUserData({
        ...userData,
        [name]: value,
      });
    }

    return false;
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();

    const { value, name } = event.target;

    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    client
      .patch(`/user/update/${userData.id}`, userData, false)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.error(err.response))
      .finally(() => setEditingProfile(false));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const { newPassword, newPasswordConfirmation } = passwords;

    if (newPassword !== newPasswordConfirmation) {
      return;
    }
  };

  const fieldVariant = editingProfile ? "outlined" : "standard";

  return (
    <>
      <Header />

      <form
        onSubmit={handleSubmitAddStudentToCohort}
        className='add-user-to-cohort-form'
      >
        <span>Add student to cohort: </span>
        <select>
          <option value={null}>Please select a cohort...</option>
          {cohortsAvailable &&
            cohortsAvailable.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.id}
              </option>
            ))}
        </select>
        <button type='submit' className='add-user-to-cohort-btn'>
          Confirm
        </button>
      </form>

      {!editingPassword && (
        <div className='user-form'>
          <TextField
            className='user-form-input'
            label='First Name'
            name='first_name'
            value={userData.first_name}
            onChange={handleChange}
            variant={fieldVariant}
          />
          <TextField
            className='user-form-input'
            label='Last Name'
            name='last_name'
            value={userData.last_name}
            onChange={handleChange}
            variant={fieldVariant}
          />
          <TextField
            className='user-form-input'
            type='email'
            label='Email'
            name='email'
            value={userData.email}
            onChange={handleChange}
            variant={fieldVariant}
          />

          <TextField
            className='user-form-input'
            label='Bio'
            name='biography'
            value={userData.biography}
            onChange={handleChange}
            variant={fieldVariant}
          />
          <TextField
            className='user-form-input'
            type='url'
            label='GitHub URL'
            name='github_url'
            value={userData.github_url}
            onChange={handleChange}
            variant={fieldVariant}
          />
          {editingProfile && (
            <Button
              id='user-submit-button'
              onClick={handleSubmit}
              type='submit'
              variant='contained'
            >
              Submit
            </Button>
          )}

          {!editingProfile && (
            <Box>
              <Stack spacing={2} direction='row'>
                <Button
                  variant='contained'
                  onClick={() => setEditingProfile(true)}
                >
                  Edit Profile
                </Button>{" "}
              </Stack>
            </Box>
          )}

          {!editingPassword && (
            <Box>
              <Stack spacing={2} direction='row'>
                <Button
                  variant='contained'
                  onClick={() => setEditingPassword(true)}
                >
                  Edit Password
                </Button>{" "}
              </Stack>
            </Box>
          )}
        </div>
      )}

      {editingPassword && (
        <form>
          <TextField
            className='user-form-input'
            type='text'
            label='current password'
            name='currentPassword'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <TextField
            className='user-form-input'
            type='text'
            label='new password'
            name='newPassword'
            value={userData.github_url}
            onChange={handlePasswordChange}
          />
          <TextField
            className='user-form-input'
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
      )}
    </>
  );
};

export default Profile;
