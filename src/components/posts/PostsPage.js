
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import client from '../../utils/client';
import './style.css';
import jwt_decode from 'jwt-decode';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { renderPosts } from "./utils/getAllPosts";
import PostItem from './PostItem';


const PostsPage = ({ getUserId }) => {
  const [post, setPost] = useState({ content: "" });
  const [createCohortRes,setCreateCohortRes]=useState(false)
  const [postResponse, setPostResponse] = useState("");
  const [posts, setPosts] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [cohorts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN);
    if(!token){ return }
    const decoded = jwt_decode(token);
    
    let id = decoded.userId;

    client.get(`/user/${id}`).then((res) => {
      if (res.data.data.user.role === 'TEACHER') {
        setIsTeacher(true);
      }
    }).catch(console.log);
    renderPosts(setPosts)
  }, [postResponse]);


  const createPost = async event => {
    event.preventDefault();
    client

      .post("/post", post)
      .then(res => setPostResponse(res.data))
      .catch(() => {
        setPostResponse("There was a problem creating this post")
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

  function createCohort(event) {
    event.preventDefault();
    client.post('/cohort').then((res) => {
     
      if (res.data.status === 'success') {
        setCreateCohortRes(true);
      } 
    }).catch(console.log);
    setTimeout(()=>{setCreateCohortRes(false)},3000)
    
  }

  return (
    <>
      {isTeacher && (
        <div className='teacher-section'>
          <h3>Teacher Area</h3>
          <Box testAlign='center'>
            {createCohortRes &&<p>Cohort created!</p>}
            <Button variant='contained' onClick={createCohort}>
              Create Cohort
            </Button>
          </Box>
          <section className='cohort-list'>
            <h4>Cohort List</h4>
            {cohorts.map((cohort) => {
              return <p>{cohort}</p>;
            })}
          </section>
        </div>
      )}

      <section className='posts-section'>
        <button id='user-signout-button' onClick={signOut}>

          sign out
        </button>
        
        <p>Status: {postResponse.status}</p>
        <PostForm handleSubmit={createPost} handleChange={handleChange} />

        {posts?.length > 0 ? (
          <ul className="posts-list">
            {posts?.map((post, index) => (
              <PostItem post={post} key={index} userId={getUserId} setPost={setPost} setPostResponse={setPostResponse} />
            ))}
          </ul>
        ) : (
          <p className="no-posts-message">There are no posts at the moment.</p>
        )}
      </section>
    </>
  );
};

export default PostsPage;
