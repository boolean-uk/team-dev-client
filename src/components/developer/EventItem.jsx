import React from 'react'
import { useState } from 'react'
import client from '../../utils/client'

const EventItem = (devEvent) => {
    const [receivedBy, setReceivedBy] = useState({})
    const [createdBy, setCreatedBy] = useState({})
    console.log('in EventItem', devEvent)
    const eventLog = devEvent.devEvent
    client
      .get(`/user/${eventLog.receivedById}`)
      .then(res => {console.log(res)})



  return (
    <li className='event-item'>
        <div className="event-header-wrap">
            <h3 className="event-type">
                {eventLog.type}
            </h3>
            <p className="createdAt-time">{eventLog.createdAt}</p>
        </div>
        <p className="event-content">
            <span className='event-user-name'>{eventLog.receivedById}</span>
            {' '}
            {eventLog.topic}
            {' '}
            <span className='event-user-name'>{eventLog.createdById}</span>
        </p>
    </li>
  )
}

export default EventItem