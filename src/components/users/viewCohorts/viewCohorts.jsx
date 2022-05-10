import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewCohort.css";
import Header from "../../Header/Header.jsx";
import client from "../../../utils/client";
import Table from "../../table/Table";
import { Box, Grid, List, ListItem, ListItemText, Avatar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ViewCohort() {
  const { id } = useParams();
  const [noCohort, setNoCohort] = useState([]);
  const [cohortStudents, setCohortStudents] = useState([]);
  const [resetStudents, setResetStudents] = useState(0);

  useEffect(() => {
    client
      .get("/user/student?cohort=none")
      .then((res) => setNoCohort(res.data.data))
      .catch((err) => console.log(err.response));

    client
      .get(`/user/student?cohort=${id}`)
      .then((res) => setCohortStudents(res.data.data))
      .catch((err) => console.log(err.response));
  }, [resetStudents]);

  function addStudent(studentId) {
    const data = { cohort_id: id };
    client
      .patch(`/user/${studentId}/cohort`, data)
      .then((res) => {
        setResetStudents(resetStudents + 1);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <Header />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box className="BigContainer">
          <div className="Container_cohorts">
            <div className="Parent-title-container">
              <div className="cohort-title">
                <h3>Cohort {id}</h3>{" "}
              </div>
              <div className="cohort-size-text"> Number of students: 0</div>
            </div>
            <div className="cohort-student-big-table">
              <Table cohortStudents={cohortStudents} sx={{ height: "100vh" }} />
            </div>
          </div>

          <Box className="Container_addStudent">
            <div className="box-title">
              <h3>Available students</h3>
            </div>
            <Box className="add-student-container">
              <List>
                {noCohort.map((student, key) => (
                  <ListItem
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItem: "center",
                    }}
                  >
                    <Box
                      sx={{ display: "flex" }}
                      className="individual-student-box"
                    >
                      <Box>
                        <Avatar></Avatar>
                      </Box>
                      <Box>
                        {`${student.user.firstName}
                        ${student.user.lastName}`}
                      </Box>
                      <Box className="add-student-icon">
                        <AddCircleIcon
                          onClick={() => {
                            addStudent(student.user.id);
                          }}
                          value={student.id}
                          color="string"
                          fontSize="large"
                        >
                          Add
                        </AddCircleIcon>
                      </Box>
                    </Box>
                    <ListItemText />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
