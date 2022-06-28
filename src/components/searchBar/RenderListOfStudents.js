import { useContext } from 'react'
import { loggedInUserContext } from '../../Helper/loggedInUserContext'
import { Link } from 'react-router-dom'


const RenderListOfStudents = () =>{

    const {userDataToRender} = useContext(loggedInUserContext)
    
    return(
        <>
        <header>
          <h2>List of students with first name</h2>
        </header>
        <ul className="contacts-list">
          {userDataToRender.map((student, index) => {
            const { first_name, last_name } = student
            return (
              
              <li className="contact" key={index}>
                <Link to={`/profile/${student.id}`}>
                <p>
                  {first_name} {last_name}
                </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </>      
        
    )
}

export default RenderListOfStudents


