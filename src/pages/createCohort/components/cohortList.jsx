import client from "../../../utils/client";

const cohortList=()=>{
    client.get('/cohort').then((res)=>{console.log(res)})


    return (<><p>test</p></>)
}


export default cohortList;