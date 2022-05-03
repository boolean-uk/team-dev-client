import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./viewCohort.css"
import Header from "../../Header/Header.jsx"
import client from '../../../utils/client';

export default function ViewCohort() {
  const { id } = useParams()

  const [cohortStudents, setCohortStudents] = useState([])
  const [noCohort, setNoCohort] = useState([])

  useEffect(() => {
      client
        .get(`/user`)
        .then((res) => {
        const coSt = res.data.data.users.filter(user => user.cohort_id === parseInt(id))
         const noCo = res.data.data.users.filter(user => user.role === "STUDENT" && user.cohort_id === null)
         setCohortStudents(coSt)
         setNoCohort(noCo)
        })
        .catch((err) => console.log(err.response));
  }, [])

 

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
