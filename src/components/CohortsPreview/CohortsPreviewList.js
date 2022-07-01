import { useEffect, useState } from 'react'
import client from '../../utils/client'
import CohortsPreviewListItem from './CohortsPreviewListItem'

export default function CohortsPreviewList({ handleClick }) {
  const [cohortList, setCohortList] = useState([])

  useEffect(() => {
    client.get('/cohort')
      .then(res => setCohortList(res.data.data))
      .catch(e => console.error(e.message))
  }, [])

  return (
    <ul className='cohorts-preview__list'>
      {cohortList.map(cohort => (
        <CohortsPreviewListItem key={cohort.id} {...cohort} handleClick={handleClick} />
      ))}
    </ul>
  )
}