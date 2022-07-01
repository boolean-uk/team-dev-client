import { useContext } from 'react';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { Link } from 'react-router-dom';
import './RenderListOfStudents.css';

const RenderListOfStudents = () => {
  const { userDataToRender } = useContext(loggedInUserContext);

  return (
    <>
      <header>
        <h1>Results</h1>
      </header>
      <ul className='students-list'>
        {userDataToRender.map((student, index) => {
          const { first_name, last_name, profile_url } = student;
          return (
            <li className='student-list-item' key={index}>
              <Link to={`/profile/${student.id}`} className='link'>
                <div className='two-column-grid'>
                <img className='list-of-students-img' src={profile_url}/>
                <p>
                 {first_name} {last_name}
                </p>

                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RenderListOfStudents;
