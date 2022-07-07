import './profile.css';

export default function Note({ note }) {
  return (
    <li className='note-item'>
      <p>{note.content}</p>
    </li>
  );
}
