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
  const [cohortName, setCohortName] = useState();
  const [userData, setUserData] = useState({});
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
      });
  }, [params]);

  useEffect(() => {
    if (userData.cohort_id) {
      client
        .get(`/cohort/${userData.cohort_id}`)
        .then((res) => setCohortName(res.data.data.cohortName))
        .catch((err) => console.error(err.response));
    }
  }, [userData]);

  useEffect(() => {
    client.get(`/user/${params.id}/notes`).then((res) => {
      setNotes(res.data.data.notes);
    });
  }, [params.id]);

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
          cohortName={cohortName}
        />
        {loggedInUser.role === 'TEACHER' && userData.role !== 'TEACHER' && (
          <ProfileNotes notes={notes} setNotes={setNotes} />
        )}
      </section>
    </>
  );
};

export default Profile;
