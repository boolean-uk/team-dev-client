import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import client from "../../utils/client";
import "./style.css";

const PostsPage = () => {
  const [post, setPost] = useState({ content: "" });
  const [postResponse, setPostResponse] = useState("");
  const [posts, setPosts] = useState([]);
  const [commentResponse, setcommentResponse] = useState({})
  const [comment, setComment] = useState("")
  let navigate = useNavigate();

  useEffect(() => {
    client.get("/posts").then((res) => setPosts(res.data.data.posts));
  }, []);

  const createPost = async (event) => {
    event.preventDefault();
    client
      .post('/post', post)
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

  const createComment = async (event) => {
        event.preventDefault();
    client
      .post(`/post/1/comment`, comment)
      .then((res) => {
        console.log('hello testing', res)
        setcommentResponse(res.data)
      })
      .catch((data) => {
        console.log(data);
      });
  };

  const handleComment = (event) => {
    console.log(event.target)
    event.preventDefault();
    const { value, name } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };
  return (
    <section className='posts-section'>
      <button id='user-signout-button' onClick={signOut}>
        sign out
      </button>
      <p>Status: {postResponse.status}</p>
      <PostForm handleSubmit={createPost} handleChange={handleChange} />
      <ul className='posts-list'>
        {posts.map((post, index) => (
          <li key={index} className='post-item'>
            {post.content}
            <div className="comments-section">
              <form onSubmit={createComment} >
                <input type='text' className="post__comment" onChange={handleComment} name="comment" label="New Comment" variant="outlined"/>
                <button type="button" className="comment-button" >Comment</button>
              </form>
              <ul className="comments-list">
               {commentResponse.data && 
                <li className="comment-item">{commentResponse.data.comment.content} </li >}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostsPage;