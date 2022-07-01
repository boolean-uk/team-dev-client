import { useEffect, useState } from 'react';
import client from '../../utils/client';
import StudentsPreviewListItem from './StudentsPreviewListItem';

export default function SudentsPreviewList({ id, handleClick }) {
  const [studentList, setStudentList] = useState([]);
  console.log(studentList)

  useEffect(() => {
    client.get('/user/1') //TODO: add variable id
      .then(res => setStudentList([res.data.data]))
  }, []);

  return (
    <ul>
      {studentList && studentList.map(student => (
        <StudentsPreviewListItem key={student.user.id} {...student} handleClick={handleClick} />
      ))}
      <li 
        className='cohorts-preview__list-item' 
        onClick={() => handleClick({ componentId: 'cohorts'} )}
      >
        <span>&#129144;</span>
        <span>Back</span>
      </li>
    </ul>
  )
}
