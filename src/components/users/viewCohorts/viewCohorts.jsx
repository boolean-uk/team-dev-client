import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./viewCohort.css";
import Header from "../../Header/Header.jsx";
import client from "../../../utils/client";
import Table from "../../table/Table";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ViewCohort() {
  const { id } = useParams();
  const [noCohort, setNoCohort] = useState([]);
  const [cohortStudents, setCohortStudents] = useState([]);
  const [resetStudents, setResetStudents] = useState(0);

  useEffect(() => {
    client
      .get(`/user/student?cohort=none`)
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
          <Box className="Container_cohorts">
            <h3 className="cohort-title">Cohort {id}</h3>
            <Table cohortStudents={cohortStudents} />
          </Box>

          <Box className="Container_addStudent">
            <Box>
              <h3>Available students</h3>
            </Box>
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
                    {/* <ListItemAvatar> */}
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Avatar></Avatar>
                      </Box>
                      <Box>
                        {`${student.user.firstName} ${student.user.lastName}`}
                      </Box>
                      <Box>
                        <AddCircleIcon
                          onClick={() => {
                            addStudent(student.user.id);
                          }}
                          value={student.id}
                          color="success"
                          fontSize="large"
                        >
                          Add
                        </AddCircleIcon>
                      </Box>
                    </Box>
                    {/* </ListItemAvatar> */}
                    <ListItemText />
                  </ListItem>
                ))}
              </List>
              {/* {noCohort.map((student, key) => (
                <Box className="add-student-card" key={key}>
                  <Box className="add-student">
                    {student.user.firstName} {student.user.lastName}
                    <Button
                      onClick={() => {
                        addStudent(student.user.id);
                      }}
                      value={student.id}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              ))} */}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
