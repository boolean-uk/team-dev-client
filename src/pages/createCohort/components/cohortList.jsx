import { Card } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import client from "../../../utils/client";
import "./style.css"

const CohortList=()=>{
    const [cohorts,setCohorts]=useState([])

    useEffect(()=>{
        client.get('/cohort').then((res)=>{setCohorts(res.data.data.cohorts)})
    
        console.log('cohorts',cohorts)
    },[]);
   


    return (
    <>
    <div className="cohort-list">
     {cohorts.map(cohort=>{return (
     <Card className="cohort-card" key={`${cohort.id}`}>
        {`cohort ${cohort.id} - cohort name`}
    
     </Card>
      )}
    )}
    </div>
    </>)
}


export default CohortList;