import like from "./like.png"
import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../utils/client';
import './style.css';

const PostLike = ({likes=[], postId}) => {
      
const [divStyle, updateLike] = useState({
  backgroundColor: 'grey'
  });
const [postLikes,updateLikes] = useState(likes)
const [id, updateId] = useState("");

  function likePost(event){
  client.post(`/post/${postId}/like/`)
  .then(res => {
    updateId(_ => res.data.data.id)
    updateLikes(likes => [res.data.data, ...likes])
  })
  .catch((err) => {
    console.log({error: err.message})
  })
  }

  function unlikePost(event){
    client.delete(`/post/like/${id}`)
    .then(res => {
      updateLikes(likes => likes.filter(like => like.id !== id))
    })
    .catch((err) => {
      console.log({error: err.message})
    })
  }

function toggleLike(event) {
  if (divStyle.backgroundColor === 'grey') likePost(event);
  else if (divStyle.backgroundColor !== 'grey') unlikePost(event);
  const updatedStyle = divStyle.backgroundColor === `#1976d2` ? {backgroundColor: 'grey'} : {backgroundColor: '#1976d2'}
  updateLike(updatedStyle);
}

    return <div className = 'like-section'>
    <p>Likes: {postLikes.length}</p>
    <div className = 'icon-container' onClick={toggleLike} style={divStyle}>
      <img className='post-like' src={like} alt='like'/>
      </div>
    </div>
}

export default PostLike