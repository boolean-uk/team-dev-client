import { useContext } from "react"
import { loggedInUserContext } from "../../Helper/loggedInUserContext"


const RenderListOfStudents = () =>{

    const {userDataToRender} = useContext(loggedInUserContext)
    console.log('userdata', userDataToRender);
    return(
        <>
        <header>
          <h2>lp</h2>
        </header>
        <ul className="contacts-list">
          {userDataToRender.map((student, index) => {
            const { first_name, last_name } = student
            return (
              
              <li className="contact" key={index}>
                <a href="">
                  {first_name} {last_name}
                </a>
              </li>
            )
          })}
        </ul>
      </>

        
        // <ul>
        //     {userDataToRender.map((students, index) = {
        //     return (
        //         <li>{students.first_name}</li>
        //     )
        //     })}
        // </ul>        
        
    )
}

export default RenderListOfStudents


