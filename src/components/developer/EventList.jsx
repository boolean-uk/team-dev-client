import EventItem from './EventItem'

const EventList = (eventLogs) => {
    console.log('what is this', eventLogs)
  return (
    <ul className='events-list'>
        { eventLogs.eventLogs.map((devEvent, index) => {
            console.log('devEvent',devEvent)
            return <EventItem devEvent={devEvent} key={index} />
          }
        )}
    </ul>
  )
}

export default EventList