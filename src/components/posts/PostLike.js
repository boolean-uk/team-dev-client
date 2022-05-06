import like from "./like.png"
import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

let divStyle = {
  backgroundColor: 'grey'
  };

const PostLike = () => {
        const [isLiked, updateLike] = useState(false);
      
    useEffect(() => {
      if (divStyle.backgroundColor === `#1976d2`){
        divStyle = {backgroundColor: 'grey'};
      }
      else (divStyle = {backgroundColor:`#1976d2`})
      return;
      }, [isLiked]);

    function toggleLike() {
        updateLike(!isLiked)
    }
    return <div className = 'icon-container' onClick={toggleLike} style={divStyle}><img className='post-like' src={like} alt='like'/></div>

    
}

export default PostLike