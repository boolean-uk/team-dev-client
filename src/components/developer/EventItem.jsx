import React, { useEffect } from 'react'
import { useState } from 'react'
import client from '../../utils/client'

const EventItem = (devEvent) => {
    const [receivedBy, setReceivedBy] = useState({})
    const [createdBy, setCreatedBy] = useState({})
    console.log('in EventItem', devEvent)
    const eventLog = devEvent.devEvent

    useEffect(() => {
        const receivedByUserId = eventLog.receivedById;
        if (receivedByUserId !== null) {
            client
            .get(`/user/${eventLog.receivedById}`)
            .then(res => {setReceivedBy(res.data.data.user)})
        }
        const createdByUserId = eventLog.createdById;
        if (createdByUserId !== null) {
            client
            .get(`/user/${eventLog.createdById}`)
            .then(res => {setCreatedBy(res.data.data.user)})
        }
        console.log('createdBy', createdBy)
        console.log('receivedBy', receivedBy)
    },[])

  return (
    <li className='event-item'>
        <div className="event-header-wrap">
            <h3 className="event-type">
                {eventLog.type}
            </h3>
            <p className="createdAt-time">{eventLog.createdAt}</p>
        </div>
        <p className="event-content">
            <span className='event-user-name'>{receivedBy.first_name} {receivedBy.last_name}</span>
            {' '}
            {eventLog.topic}
            {' '}
            <span className='event-user-name'>{createdBy.first_name} {createdBy.last_name}</span>
        </p>
    </li>
  )
}

export default EventItem