import { Box, Button } from "@mui/material"
import { useState } from "react";
import client from "../../utils/client";
import cohortList from "./components/cohortList";

const CreateCohort=()=>{
    const [createCohortRes,setCreateCohortRes]=useState(false)
    function createCohort(event) {
        event.preventDefault();
        client.post('/cohort').then((res) => {
         
          if (res.data.status === 'success') {
            setCreateCohortRes(true);
          } 
        }).catch(console.log);
        setTimeout(()=>{setCreateCohortRes(false)},3000)
        
      }
    return (<>
    <Box>
      <div className="create-cohort">
         <Button variant="contained" onClick={createCohort}>Create</Button>
         {createCohortRes &&<p>Cohort created!</p>}
      </div>
    <div className="cohort-list">
        <cohortList />

    </div>
    </Box>
    </>)
}

export default CreateCohort