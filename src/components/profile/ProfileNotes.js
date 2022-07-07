import { useState, useEffect } from 'react';
import client from '../../utils/client';
import Note from './Note';
import './profile.css';

const ProfileNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    client.get('/user/2/notes').then((res) => {
      setNotes(res.data.data.notes);
    });
  }, []);

  return (
    <div>
      <h2>Student Notes</h2>
      <ul className='notes-list'>
        {notes &&
          notes.map((note, index) => (
            <div key={note.id} className='note-container'>
              <Note key={index} note={note} setNotes={setNotes} />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ProfileNotes;
