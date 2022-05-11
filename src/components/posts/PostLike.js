import like from './like.png';
import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../utils/client';
import './style.css';
import colours from '../../utils/colours';

const PostLike = ({likes=[], postId}) => { 

const blue = colours.blueRadGradient;
const grey = colours.greyRadGradient;

const [divStyle, setStyle] = useState({ backgroundImage: grey });
const [postLikes,setLikes] = useState(likes);
const [id, setId] = useState('');
const [talkingToServer, setTalkStatus] = useState(false);

useEffect(()=>{
  const like = likes.find(like => String(like.userId) === localStorage.getItem('userId')); // checks if user has liked the post
  if (like){
    setStyle({backgroundImage: blue});
    setId(like.id);
  }
},[]);

  function likePost(event){
  setTalkStatus(true);
  client.post(`/post/${postId}/like/`)
  .then(res => {
    setId(_ => res.data.data.id);
    setLikes(likes => [res.data.data, ...likes]);
    setStyle({backgroundImage: blue});
  })
  .catch((err) => {
    console.log({error: `when liking post: ${err.message}`});
  })
  .finally(() => setTalkStatus(false));
  }

  function unlikePost(event){
    setTalkStatus(true);
    client.delete(`/post/like/${id}`)
    .then(_ => {
      setLikes(likes => likes.filter(like => like.id !== id));
      setStyle({backgroundImage: grey});
    })
    .catch((err) => {
      console.log({error: `when unliking post: ${err.message}`});
    })
    .finally(() => setTalkStatus(false));
  }

function toggleLike(event) {
  if (talkingToServer) return;
  if (divStyle.backgroundImage === grey) likePost(event);
  else if (divStyle.backgroundImage === blue) unlikePost(event);
}

    return <div className = 'like-section'>
    <p className = 'like-label'>Likes: {postLikes.length}</p>
    <div className = 'icon-container' onClick={toggleLike} style={divStyle}>
      <img className='like-img' src={like} alt='like'/>
    </div>
    </div>;
};

export default PostLike;
