export default function StudentsPreviewListItem({ user: { id, first_name, last_name }, handleClick }) {
  const name = `${first_name} ${last_name}`

  return (
    <li 
      className='cohorts-preview__list-item' 
      onClick={(e) => handleClick({ componentId: 'student-summary', studentId: id })}
      >
      <span>{name}</span>
    </li>
  )
}