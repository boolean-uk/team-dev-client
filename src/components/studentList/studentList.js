import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../utils/client";
import { loggedInUserContext } from "../../Helper/loggedInUserContext";
import { useContext } from "react";
import "../studentList/studentList.css";

export default function SudentList() {
  const [cohort, setCohort] = useState([]);
  const { loggedInUser } = useContext(loggedInUserContext);

  const navigate = useNavigate();

  useEffect(() => {
    client
      .get(`/users?cohort_id=${loggedInUser.cohort_id}`)
      .then((res) => setCohort(res.data.data.users));
  }, [loggedInUser]);

  function handleClick(id) {
    navigate(`../profile/${id}`);
  }

  return (
    <section className="student-list-box">
      <h1 className="student-list-title">Student list</h1>
      <h2>Number of Students:</h2>
      <h2 className="number-student">{cohort.length}</h2>
      <ul className="student-list">
        {cohort.map((student) => (
          <li>
            <div onClick={() => handleClick(student.id)}>
              {`${student.first_name} ${student.last_name}`}
              <div>
                <img src={student.profile_url} alt=""></img>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
