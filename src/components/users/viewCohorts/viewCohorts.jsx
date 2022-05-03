import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./viewCohort.css"
import Header from "../../Header/Header.jsx"
import client from '../../../utils/client';

export default function ViewCohort() {
  const { id } = useParams()

  // const [allStudents, setAllStudents] = useState([])
  const [noCohort, setNoCohort] = useState([])

  let all = []

  useEffect(() => {
      client
        .get(`/user`)
        .then((res) => {
         const noCo = res.data.data.users.filter(user => user.role === "STUDENT" && user.cohort_id === null)
         setNoCohort(noCo)
        })
        .catch((err) => console.log(err.response));
  }, [])

  //fetch with useeffect, set a state
  //get all users then filter out ones with no cohort id
  //render a list with map below

  

  return (
    <>
      <Header />
      <div className="BigContainer">
        <div className="Container_cohorts">
          <h3>Cohort {id}</h3>
        </div>
        <div className="Container_addStudent">
          <div><h3>Add Students Here</h3></div>
          <div className="add-student-container">{noCohort.map((student, key) => (<div className="add-student-card"><button>Add</button><div key={key} className="add-student">{student.firstName} {student.lastName}</div></div>))}</div>
        </div>
      </div>
    </>
  )
}
