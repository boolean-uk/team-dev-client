import { React, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import client from '../../utils/client';
import './profile.css';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import ProfileNotes from './ProfileNotes';
import ProfileSection from './profileSection';

const Profile = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const params = useParams();
  const [userData, setUserData] = useState({});
  const [cohortsAvailable, setCohortsAvailable] = useState([]);

  const [isValidId, setIsValidId] = useState(true);
  const { loggedInUser } = useContext(loggedInUserContext);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    client
      .get(`/user/${params.id}`)
      .then((res) => {
        setUserData(res.data.data.user);
      })
      .catch((err) => {
        setIsValidId(false);
        console.log(err.response);
      });
  }, [params]);

  useEffect(() => {
    client
      .get('/cohort')
      .then((res) => {
        setCohortsAvailable(res.data.data);
      })
      .catch((err) => console.error(err.response));
  }, []);

  useEffect(() => {
    client.get(`/user/${params.id}/notes`).then((res) => {
      setNotes(res.data.data.notes);
    });
  }, []);

  const handleSubmitAddStudentToCohort = (e) => {
    e.preventDefault();

    const selectedCohortId = Number(e.target[0].value);

    client.patch(`/user/${userData.id}`, { cohort_id: selectedCohortId });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (editingProfile) {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    client
      .patch(`/user/update/${userData.id}`, userData, false)
      .then((res) => setUserData(res.data.data.user))
      .catch((err) => console.error(err.response))
      .finally(() => setEditingProfile(false));
  };

  return (
    <>
      <Header />

      <form
        onSubmit={handleSubmitAddStudentToCohort}
        className='add-user-to-cohort-form'
      >
        <span>Add student to cohort: </span>
        <select>
          <option value={null}>Please select a cohort...</option>
          {cohortsAvailable &&
            cohortsAvailable.map((cohort) => (
              <option key={cohort.id} value={cohort.id}>
                {cohort.id}
              </option>
            ))}
        </select>
        <button type='submit' className='add-user-to-cohort-btn'>
          Confirm
        </button>
      </form>
      <section
        className={
          loggedInUser.role === 'TEACHER' && userData.role !== 'TEACHER'
            ? 'split-two'
            : null
        }
      >
        <ProfileSection
          isValidId={isValidId}
          editingPassword={editingPassword}
          setEditingPassword={setEditingPassword}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          userData={userData}
          editingProfile={editingProfile}
          setEditingProfile={setEditingProfile}
        />
        {loggedInUser.role === 'TEACHER' && userData.role !== 'TEACHER' && (
          <ProfileNotes notes={notes} setNotes={setNotes} />
        )}
      </section>
    </>
  );
};

export default Profile;
