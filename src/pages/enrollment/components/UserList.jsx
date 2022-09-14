import { useState } from "react";
import { useEffect } from "react";
import client from "../../../utils/client";
import UserListItem from "./UserListItem";
import "./style.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    client
      .get("/cohort")
      .then(res => setCohorts(res.data.data.cohorts))
      .catch(err => setError("error"));
  }, []);

  useEffect(() => {
    client
      .get("/user")
      .then(res => setUsers(res.data.data.users))
      .catch(err => setError("error"));
  }, []);

  return (
    <>
      {error ? (
        <h2>Something went wrong</h2>
      ) : (
        <div>
          {users.map((user, i) => (
            <UserListItem
              key={i}
              {...user}
              cohorts={cohorts}
              setError={setError}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
