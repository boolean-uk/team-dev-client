
const EventItem = (devEvent) => {
  const eventLog = devEvent.devEvent

  return (
    <li className='event-item'>
        <div className="event-header-wrap">
            <h3 className="event-type">
                {eventLog.type}
            </h3>
            <p className="createdAt-time">{eventLog.createdAt}</p>
        </div>
        <p className="event-content">
            <span className='event-user-name'>
                {eventLog.receivedBy?.profile.firstName}
                {' '}
                {eventLog.receivedBy?.profile.lastName}
                { eventLog.receivedBy ? ('(' + eventLog.receivedBy?.role + ')') : null }
            </span>
            {' '}
            {eventLog.topic}
            {' '}
            {eventLog.content}
            {' '}
            <span className='event-user-name'>
                {eventLog.createdBy?.profile.firstName}
                {' '}
                {eventLog.createdBy?.profile.lastName}
                { eventLog.createdBy ? ('(' + eventLog.createdBy?.role + ')') : null }
            </span>
        </p>
    </li>
  )
}

export default EventItem