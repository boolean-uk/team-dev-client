import React from 'react';
import { Button, Dialog, DialogContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, ClickAwayListener } from '@mui/material'
import { useState } from 'react'

const ChangeUserRole = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDialogShow = () => {
    setIsOpen(!isOpen)
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
                  <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="ADMIN" control={<Radio />} label="ADMIN" />
                    <FormControlLabel value="TEACHER" control={<Radio />} label="TEACHER" />
                    <FormControlLabel value="STUDENT" control={<Radio />} label="STUDENT" />
                  </RadioGroup>
                </FormControl>
            </DialogContent>
          </ClickAwayListener>
        </Dialog>
    
    </>
  )
}

export default ChangeUserRole;