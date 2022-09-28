import React from 'react';
import { Button, Dialog, DialogContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, ClickAwayListener, Alert } from '@mui/material'
import { useState } from 'react'
import client from '../../utils/client';
import './style.css'
import { useLocation } from 'react-router-dom';

const ChangeUserRole = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [roleChanged, setRoleChanged] = useState(false)
  const location = useLocation()
  const userLocation = location?.state?.user
  const [user, setUser] = useState(userLocation)
  
  const handleDialogShow = () => {
    setIsOpen(!isOpen)
    setValue('')
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const handleSubmit = () => {
    client
      .put(`/admin/user/${user.id}`, { role: value })
      .then(res => {
        const user = res.data
        setRoleChanged(true)
        setUser(user)

        setTimeout(() => {
          setRoleChanged(false)
          setIsOpen(false)
          setValue('')
        }, '2500');
      })
  }

  return (
    <>
      <Button variant='outlined' onClick={handleDialogShow}>
        Change Role
      </Button>
        <Dialog open={isOpen}>
          {roleChanged && 
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