import PostsPage from '../posts/PostsPage';
import Header from '../Header/Header';
import CohortsPreview from '../CohortsPreview';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext } from 'react';
import './home.css'

export default function HomePage() {
  const { loggedInUser } = useContext(loggedInUserContext);

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
      <div className='home-page'>
        <PostsPage />
        {loggedInUser.role === 'TEACHER' && <CohortsPreview />}
      </div>
    </>
  )
}