import EventItem from './EventItem'

const EventList = (eventLogs) => {
  return (
    <ul className='events-list'>
        { eventLogs.eventLogs.map((devEvent, index) => {
            return <EventItem devEvent={devEvent} key={index} />
          }
        )}
    </ul>
  )
}

export default EventList