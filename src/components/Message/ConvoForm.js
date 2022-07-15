import { useState } from 'react'
import {Button,InputBase,Box, Select, TextField } from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react'
import { loggedInUserContext } from '../../Helper/loggedInUserContext'
import client from '../../utils/client';

const ConvoForm = ({setConversations}) => {

  const { loggedInUser } = useContext(loggedInUserContext)
  const [personName, setPersonName] = useState([])
  const [userNameInput, setUserNameInput] = useState([])
  const [groupMembers, setGroupMembers] = useState([loggedInUser])
  const [selectUsers , setSelectUsers ] = useState([])
  const [convoName , setConvoName] = useState(' ')
  
  
  const handleConvoName = (event) =>{
    event.preventDefault()
    const {value, name} = event.target
    setConvoName({
        [name]: value,
    })
  }

  const searchUser = () =>{
    client
      .get(`/users?first_name=${userNameInput.searchInput}`)
      .then((res) => setSelectUsers(res.data.data.users)) 
      .catch((err) => console.error(err.response));
  }
  
  const findUser = (userId) => {
    return selectUsers.find((user) => user.id === +userId);
};

  const handleChange = (event) => {
    setGroupMembers((prevUsers) => [...prevUsers, findUser(event.target.value)]);
    const {
      target: { value }
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value
    )
    setPersonName([])
    setSelectUsers([])
  };

  const handleSearchName = (event) => {
    event.preventDefault()
    const {value, name} = event.target
    setUserNameInput({
        [name]: value,
    });
}

  const createConversation = async() =>{
    const postConvo = { name: convoName.name , usersIds: groupMembers.map((member) => {
      return member.id
    })}
    try{
      await client
        .post('/conversations', postConvo )
    }catch(error){
      console.error(error.response)
    }
    getConversations()
  }

  const getConversations = () => {
    client
      .get(`/users/${loggedInUser.id}/conversations`)
      .then((res) => setConversations(res.data.data.conversations))
      .catch((err) => console.error(err.response));
  }
    return(
       <form className='five-column-grid'>
          <div>
            <TextField
            size='small'
            name='name'
            className='convo-name'
            label='Name of conversation'
            onChange={handleConvoName}
            value={convoName.name}
            />
          </div>
          <div className='two-column-grid-auto'>
            <Box sx={{ backgroundColor: 'white',  m: 0}}>
            <InputBase
              size='small'
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              value={userNameInput.searchInput}
              onChange={handleSearchName}
              name='searchInput'
            />
          </Box>
             <Button size='small' variant='contained' onClick={searchUser}>Search User</Button>
          </div>
          <div>
        <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id='multiple-checkbox-label'>Add Name</InputLabel>
        <Select
          labelId='multiple-checkbox-label'
          id='multiple-checkbox'
          multiple
          size='small'
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label='Add Name'/>}
          renderValue={(selected) => selected.join(", ")}
        >
          {selectUsers.map((name) => {
            const userName = `${name.first_name} ${name.last_name}`
            return(
            <MenuItem key={userName} value={name.id}>
              <Checkbox checked={personName.indexOf(userName) > -1} />
              <ListItemText primary={userName} />
            </MenuItem>
            )
          })}
        </Select>
      </FormControl>
        </div>
        <div>
          <ul className='group-names-container'>
            {groupMembers.length > 0 && groupMembers.map((user, index) => {
              const { first_name, last_name} = user;
                return(
                  <li key={index}>
                   {first_name} {last_name}
                  </li>
                );
              })}
          </ul>
        </div>
          <div>
            <Button onClick={createConversation}variant='contained'>Create Conversation</Button>
          </div>
       </form>
    )
}

export default ConvoForm