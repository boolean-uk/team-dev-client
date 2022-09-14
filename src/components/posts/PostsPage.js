import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import client from "../../utils/client";
import "./style.css";

import Header from "../Header/Header";

const PostsPage = () => {
  const [post, setPost] = useState({ content: "" });
  const [postResponse, setPostResponse] = useState("");
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    client.get("/posts").then(res => setPosts(res.data.data.posts));
  }, []);

  const createPost = async event => {
    event.preventDefault();
    client
      .post("/post", post)
      .then(res => setPostResponse(res.data))
      .catch(data => {
        console.log(data);
      });
  };

  const handleChange = event => {
    event.preventDefault();
    const { value, name } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const signOut = event => {
    event.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
    navigate("../", { replace: true });
  };

  return (
    <>
      <Header companyName={`Cohort Manager 2.0`} />
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
