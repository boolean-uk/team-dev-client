export default function DeliveryLog({ data }) {
  const author = `${data.user.profile.firstName[0]}. ${data.user.profile.lastName}`
  const date = data.date.split('T')[0]

  return (
    <div className="log">
      <header className="log-header">
        <span>{author}</span>
        <span></span>
        <span>{date}</span>
      </header>
      <div className="log-body">
        <span>Cohort: {data.cohortId}</span>
        <span></span>
        <div>
          {data.lines.map((line, i) => (
          <p key={line.id}>{line.content}</p>
      ))}
        </div>
      </div>
    </div>
  )
}