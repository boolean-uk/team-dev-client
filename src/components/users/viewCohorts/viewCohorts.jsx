import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./viewCohort.css"
import client from "../../../utils/client"
import Table from "../../table/Table"
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
} from "@mui/material"
import AddCircleIcon from "@mui/icons-material/AddCircle"

export default function ViewCohort() {
  const { id } = useParams()
  const [noCohort, setNoCohort] = useState([])
  const [cohortStudents, setCohortStudents] = useState([])
  const [resetStudents, setResetStudents] = useState(0)

  useEffect(() => {
    client
      .get('/user/student?cohort=none')
      .then((res) => setNoCohort(res.data.data))
      .catch((err) => console.log(err.response))

    client
      .get(`/user/student?cohort=${id}`)
      .then((res) => setCohortStudents(res.data.data))
      .catch((err) => console.log(err.response))
  }, [resetStudents])

  function addStudent(studentId) {
    const data = { cohort_id: id }
    client
      .patch(`/user/${studentId}/cohort`, data)
      .then((res) => {
        setResetStudents(resetStudents + 1);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response))
  }

  return (
    <>
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
              <Table cohortStudents={cohortStudents} />
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
                    {/* <ListItemAvatar> */}
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
                            addStudent(student.user.id)
                          }}
                          value={student.id}
                          color="string"
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
                <Box className='add-student-card' key={key}>
                  <Box className='add-student'>
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
  )
}
