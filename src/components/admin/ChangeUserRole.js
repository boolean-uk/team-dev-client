import React from 'react';
import { Button, Dialog, DialogContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, ClickAwayListener } from '@mui/material'
import { useState } from 'react'
import './style.css'
import client from '../../utils/client';
import { useLocation } from 'react-router-dom';

const ChangeUserRole = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [roleChanged, setRoleChanged] = useState(false)
  const location = useLocation()
  const user = location?.state?.user
  const path = `/admin/user/${user?.id}`
  
  const handleDialogShow = () => {
    setIsOpen(!isOpen)
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const handleSubmit = (e) => {
    user.role = value
    console.log(user)
    // client
    //   .patch(path, { role: value })
    //   .then(res => console.log(res))

  }

  return (
    <>
      <Button variant='outlined' onClick={handleDialogShow}>
        ChangeRole
      </Button>
        <Dialog open={isOpen}>
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
                  <div className='change_role__submit_button'>
                    <Button variant='contained' onClick={handleSubmit}>Update</Button>
                  </div>
                </FormControl>
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
    
    </>
  )
}

export default ChangeUserRole;