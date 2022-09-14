import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import client from "../../utils/client";
import "./style.css";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import Header from "../Header/Header";

const PostsPage = () => {
  const [post, setPost] = useState({ content: "" });
  const [postResponse, setPostResponse] = useState("");
  const [posts, setPosts] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [cohorts, setCohorts] = useState([]);
  const tokenKey = process.env.REACT_APP_USER_TOKEN;

  //useEffect(() => {
  //   client.get("/cohort").then((res) => setCohorts(res.data.data.cohort));
  // }, []);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    const decoded = jwt_decode(token);
    console.log(decoded);
    let id = decoded.userId;

    client.get(`/user/${id}`).then((res) => {
      console.log("res", res);
      if (res.data.data.user.role === "TEACHER") {
        setIsTeacher(true);
      }
      console.log(isTeacher);
    });

    client.get("/posts").then((res) => {
      setPosts(res.data.data.posts);
    });
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    client
      .post("/post", post)
      .then((res) => setPostResponse(res.data))
      .catch((data) => {
        console.log(data);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const signOut = (event) => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
    navigate("../", { replace: true });
  };

  function createCohort(event) {
    event.preventDefault();
    client.post("/cohort").then((res) => {
      console.log("create cohort res data:", res.data);
      if (res.data.status === "success") {
        alert(`cohort ${res.data.data.cohort.id} created`);
      } else {
        alert(`error`);
      }
    });
  }

  return (
    <>
      <Header
        companyName={`Cohort Manager 2.0`}
        isTeacher={isTeacher}
        createCohort={createCohort}
      />

      {isTeacher && (
        <div className="teacher-section">
          <h3>Teacher Area</h3>
          <Box testAlign="center">
            <Button variant="contained" onClick={createCohort}>
              Create Cohort
            </Button>
          </Box>
          <section className="cohort-list">
            <h4>Cohort List</h4>
            {cohorts.map((cohort) => {
              return <p>{cohort}</p>;
            })}
          </section>
        </div>
      )}

      <section className="posts-section">
        <button id="user-signout-button" onClick={signOut}>
          sign out
        </button>

        <p>Status: {postResponse.status}</p>
        <PostForm handleSubmit={createPost} handleChange={handleChange} />
        <ul className="posts-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              {post.content}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default PostsPage;
