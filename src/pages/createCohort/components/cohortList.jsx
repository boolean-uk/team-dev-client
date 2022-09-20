import { Button, Card, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import client from '../../../utils/client';
import './style.css';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const CohortList = () => {
  const [cohorts, setCohorts] = useState([]);
  const [expanded, setExpanded] = React.useState('panel1');

  useEffect(() => {
    client
      .get('/cohort')
      .then(res => {
        setCohorts(res.data.data.cohorts);
      })
      .catch(console.log);
  }, []);

  const updateCohortName=()=>{
    return (<p>edit</p>)
  }

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    width: 1000,
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
   
    
  
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <div className="cohort-list">
        {cohorts.map(cohort => {
          return (<div>
            <Accordion expanded={expanded===`panel${cohort.id}`} onChange={handleChange(`panel${cohort.id}`)}>
              <AccordionSummary aria-controls={`panel${cohort.id}d-content`} id={`panel${cohort.id}d-header`}>
                <Typography>{`cohort ${cohort.id} - ${cohort.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <IconButton className='edit' onClick={updateCohortName}>< EditIcon/></IconButton>
              </AccordionDetails>

            </Accordion>
          </div>);
        })}
      </div>
    </>
  );
};
export default CohortList;


//<Card className="cohort-card" key={`${cohort.id}`}>
             // {`cohort ${cohort.id} - ${cohort.name}`}
             // <IconButton className='edit' onClick={updateCohortName}>< EditIcon/></IconButton>
           // </Card>
