import React from "react"
import { useParams } from "react-router-dom"
import "./viewCohort.css"
import Header from "../../Header/Header.jsx"

export default function ViewCohort() {
  const { id } = useParams()

  return (
      <>
    <Header/>
    <div className="BigContainer">
      <div className="Container_cohorts">
        <h3>Cohort {id}</h3>
      </div>
      <div className="Container_addStudent">
      <div>Student</div>
      </div>
      </div>
      </>
  )
}
