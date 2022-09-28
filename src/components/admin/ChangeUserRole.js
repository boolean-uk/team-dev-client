import React from 'react';
import { Button, Dialog, DialogContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, ClickAwayListener, Alert } from '@mui/material'
import { useState } from 'react'
import client from '../../utils/client';
import './style.css'
import { useLocation } from 'react-router-dom';

const ChangeUserRole = ({ setUser, user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [roleChangedSuccess, setRoleChangedSuccess] = useState(false)
  const [roleChangedError, setRoleChangedError] = useState(false)
  const location = useLocation()
  const userLocation = location?.state?.user
  
  const handleDialogShow = () => {
    setIsOpen(!isOpen)
    setValue('')
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const handleSubmit = () => {
    client
      .put(`/admin/user/${userLocation.id}`, { role: value })
      .then(res => {
        const role = res.data.data.role
        const updatedUser = {
          ...user,
          role
        }
        setRoleChangedSuccess(true)
        setUser(updatedUser)

        setTimeout(() => {
          setRoleChangedSuccess(false)
          setIsOpen(false)
          setValue('')
        }, '2500');
      })
      .catch(err => {
        console.error(err.response);
        setRoleChangedError(true);

        setTimeout(() => {
          setRoleChangedError(false);
        }, '2500');
      });
  }

  return (
    <>
      <Button variant='outlined' onClick={handleDialogShow}>
        Change Role
      </Button>
        <Dialog open={isOpen}>
          {roleChangedError &&
            <Alert severity='error'>
              Unable to change the Role
            </Alert>
          }
          {roleChangedSuccess && 
            <Alert severity="success">
              Role changed successfully
            </Alert>
          }
          <ClickAwayListener onClickAway={handleDialogShow}>
            <DialogContent>
                <h1>Change Role</h1>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label"/>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="ADMIN" control={<Radio />} label="ADMIN" />
                    <FormControlLabel value="TEACHER" control={<Radio />} label="TEACHER" />
                    <FormControlLabel value="STUDENT" control={<Radio />} label="STUDENT" />
                  </RadioGroup>
                  <div className='admin_btn_update'>
                    <Button variant='contained' sx={{ padding: '0.5rem 2rem' }} onClick={handleSubmit}>Update</Button>
                  </div>
                </FormControl>
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
    </>
  )
}

export default ChangeUserRole;