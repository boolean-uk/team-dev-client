import { Button, Card, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../utils/client';
import './style.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


const CohortList = () => {
  const [cohorts, setCohorts] = useState([]);
  const [expand, setExpand]=useState('')
  const [newCohortName,setNewCohortName]= useState('')
  const [updateCohortNameRes,setUpdateCohortRes]= useState(false)
  const [error, setError]=useState(false)

  useEffect(() => {
    client
      .get('/cohort')
      .then(res => {
        setCohorts(res.data.data.cohorts);
      })
      .catch(console.log);
  }, []);

  const updateCohortName=(event)=>{
    event.preventDefault()
    if (!newCohortName){setError(true); setTimeout(() => {
      setError(false)
    }, 3000);}
    else{
    client.patch(`/cohort/${event.target.id}`,{name:newCohortName},true)
    .then(res=>{if (res.data.status === 'success') {
      setUpdateCohortRes(true);
    }})
    .catch(console.log);

    setNewCohortName('');
    
    setTimeout(() => {
      setUpdateCohortRes(false);
    }, 3000);}
    window.location.reload()
  }


  function enterNewName(event){
   event.stopPropagation()
   event.preventDefault()
    setNewCohortName(event.target.value)
  }

 
  

  return (
    <>
      <div className="cohort-list">
        {cohorts.map(cohort => {

          return (<div>
           <Card id={cohort.id} className='cohort-card'>
                <Typography>{`cohort ${cohort.id} - ${cohort.name}`}</Typography>
                <IconButton>
                  <ExpandMoreIcon onClick={()=>{setExpand(cohort.id)}}/>
                </IconButton>
                {expand ===cohort.id && (
                  <>
                <form>
                  <label for ='newName'>New cohort name:</label>
                  <input type='text' id='newName' key={cohort.id} onChange={enterNewName} value={newCohortName}></input>
                </form>
              <Button id={`${cohort.id}`} className='edit' onClick={updateCohortName} >submit</Button>
              {updateCohortNameRes===true && <p>successful</p>}
              {error===true && <p>please enter a valid name!</p>}
              </>)
              }
              </Card>

          </div>);

        })}
      </div>
    </>
  );
};
export default CohortList;



