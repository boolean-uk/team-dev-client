import Note from './Note';
import './profile.css';


const ProfileNotes = ({ notes, setNotes }) => {


  return (
    <div>
      <h2>Student Notes</h2>
      <ul className='notes-list'>
        {notes &&
          notes.map((note, index) => (
            <div key={note.id} className='note-container'>
              <Note key={index} note={note} setNotes={setNotes} notes={notes} />
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ProfileNotes;
