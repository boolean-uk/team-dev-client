import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./viewCohort.css"
import Header from "/Users/danielmccarthy/team-dev-client/src/components/Header/Header.jsx"

export default function ViewCohort() {
  const { id } = useParams()

  return (
      <>
    <Header/>
    <div className="BigContainer">
      <div className="Container_cohorts">
        <h3>Cohort {id}</h3>
      </div>
      <div className="Conatiner_addStudent">
      <div>Student</div>
      </div>
      </div>
      </>
  )
}
