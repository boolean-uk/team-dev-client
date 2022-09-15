import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import client from "../../utils/client";
import "./style.css";
import jwt_decode from "jwt-decode";
import SearchBar from '../Header/SearchBar';


function TeacherArea() {
  const [isTeacher, setIsTeacher] = useState(false);
  const [createCohortRes, setCreateCohortRes] = useState(false);
  const [cohorts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
    if (!token) {
      return;
    }
    const decoded = jwt_decode(token);

    let id = decoded.userId;

    client
      .get(`/user/${id}`)
      .then(res => {
        if (res.data.data.user.role === "TEACHER") {
          setIsTeacher(true);
        }
      })
      .catch(console.log);
  }, []);

  function createCohort(event) {
    event.preventDefault();
    client.post('/cohort').then((res) => {
     
      if (res.data.status === 'success') {
        setCreateCohortRes(true);
      } 
    }).catch(console.log);
    setTimeout(()=>{setCreateCohortRes(false)},3000)
  }


  return (
    <div>
      {isTeacher && (
        <div className="teacher-section">
          <h3>Teacher Area</h3>
          <Box testAlign="center">
            {createCohortRes && <p>Cohort created!</p>}
            <Button variant="contained" onClick={createCohort}>
              Create Cohort
            </Button>
          </Box>

          <SearchBar />
          <section className="cohort-list">
            <h4>Cohort List</h4>
            {cohorts.map(cohort => {
              return <p>{cohort}</p>;
            })}
          </section>
        </div>
      )}
    </div>
  );
}

export default TeacherArea;
