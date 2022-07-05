export default function CohortsPreviewListItem({ id, cohortName, handleClick }) {
  return (
    <li 
      className='cohorts-preview__list-item' 
      onClick={() => handleClick({componentId: 'students', cohortId: id})}
    >
      <span>{id}</span>
      <span></span>
      <span>{cohortName}</span>
    </li>
  )
}