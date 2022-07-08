import './profile.css';
import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import client from '../../utils/client';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../Helper/dateFormatter';

export default function Note({ note, setNotes }) {
  const params = useParams();
  const [isDeleting, setIsDeleting] = useState(false)
  const { loggedInUser } = useContext(loggedInUserContext);
  const [noteEdit, setNoteEdit] = useState({ content: '' });
  const [checkIfEditing, setCheckIfEditing] = useState(false)

  const deleteNoteHandler = (event, noteId) => {
    event.preventDefault();
    if(isDeleting){
      client
        .delete(`/note/${noteId}`)
        .then(() => setIsDeleting(false))
        .catch((err) => console.error(err.response))
        .then(() => client.get(`/user/${params.id}/notes`)
        .then((res) => {
          setNotes(res.data.data.notes);
        }))
    }else{
      setIsDeleting(true)
    }
    };

    const handleChange = (event) => {
      event.preventDefault();
      const { value, name } = event.target;
      setNoteEdit({
        [name]: value,
        isEdited: true
      });
    };

    const handleNoteEdit = async (event, noteId) => {
      event.preventDefault();
      setCheckIfEditing(true)
      if (event.target.innerText === 'Save') {
        client
          .patch(`/note/${noteId}`, noteEdit)
          .then(() => setCheckIfEditing(false))
          .then(() => client.get(`/user/${params.id}/notes`)
          .then((res) => setNotes(res.data.data.notes)))
          .catch((err) => console.error(err.response))
      }
    };

  return (
    <li className='note-container notes auto rows'>
      {(checkIfEditing && (
				<textarea
					name='content'
					defaultValue={note.content}
					onChange={(e) => handleChange(e)}
					size={30}
				></textarea>
			)) || note.content}
      <div className='three-column-expand-one'>
        {note.isEdited && (		
        <div className='time'>
						<p>Edited {formatDate(Date.parse(note.updatedAt))}</p>
				</div>)}
        {loggedInUser.role === 'TEACHER' && (<Button className='delete-btn note-button' size='small' variant='contained' color={isDeleting ? 'error' : 'primary'} onClick={(event) => deleteNoteHandler(event, note.id)}>{isDeleting ? 'Confirm': 'Delete'}</Button>)}
        <button className='note_edit_button note-button' onClick={(e) => handleNoteEdit(e, note.id)}>{checkIfEditing ? 'Save' : 'Edit Post'}</button>
      </div>
    </li>
  );
}
