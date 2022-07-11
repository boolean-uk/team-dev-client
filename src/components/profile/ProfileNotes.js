import Note from './Note';
import './profile.css';
import { useState } from 'react';
import client from '../../utils/client';
import { useParams } from 'react-router-dom';


const ProfileNotes = ({ notes, setNotes }) => {
  const [noteSubmit, setNoteSubmit] = useState({ content: '' })
  const params = useParams();

	const handleNoteChange = (event) => {
		event.preventDefault();
		const { value, name } = event.target;
		setNoteSubmit({
      [name]: value,
		});
	};

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    client
      .post(`/user/${params.id}/note`, noteSubmit)
      .then((res) => setNotes([res.data.data.note, ...notes]))
      .catch((err) => console.error(err.response))
  }

  return (
    <div>
      <h2>Student Notes</h2>
      <div className='note-container auto-rows'>
        <div className='note-container notes two-rows-expand-one'>
          <textarea
            name='content'
            placeholder='Add a note'
            onChange={(e) => handleNoteChange(e)}
            size={30}
          ></textarea>
          <div className='two-columns-expand-one'>
            <div></div>
            <button className='note_submit_button note-button' onClick={(e) => handleNoteSubmit(e)}>Save</button>
          </div>
        </div>
      </div>
      <ul className='notes-list'>
        {notes &&
          notes.map((note, index) => (
            <div key={note.id} className='note-container'>
              <Note key={index} note={note} setNotes={setNotes} notes={notes} />
            </div>
          )).sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          }
        )}
      </ul>
    </div>
  );
};

export default ProfileNotes;
