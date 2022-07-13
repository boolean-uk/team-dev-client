import { Link } from "react-router-dom"
import { Button } from '@mui/material';

export default function CohortsPreviewListItem({ id, cohortName, handleClick }) {
  return (
    <li className="cohorts-preview__list-item">
      <div
        className='cohorts-preview__list-item-information' 
        onClick={() => handleClick({componentId: 'students', cohortId: id})}
      >
        <span>{id}</span>
        <span></span>
        <span>{cohortName}</span>
      </div>
      <Button className='view-cohort-btn' variant={"outlined"} as={Link} to={`/cohorts/${id}`}>view</Button>
    </li>
  )
}