import like from "./like.png"
import React from 'react';
import { useState } from 'react';
import './style.css';

const PostLike = () => {
      
const [divStyle, updateLike] = useState({
  backgroundColor: 'grey'
  });

function toggleLike() {
  const updatedStyle = divStyle.backgroundColor === `#1976d2` ? {backgroundColor: 'grey'} : {backgroundColor: '#1976d2'}
  updateLike(updatedStyle);
}

    return <div className = 'like-section'>
    <p>Likes: 3</p>
    <div className = 'icon-container' onClick={toggleLike} style={divStyle}>
      <img className='post-like' src={like} alt='like'/>
      </div>
    </div>
}

export default PostLike