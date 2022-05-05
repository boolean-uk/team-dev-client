import like from "./like.png"
import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

const divStyle = {
    color: 'blue',
    backgroundImage: 'url(' + imgUrl + ')',
  };

const PostLike = () => {
        const [isLiked, updateLike] = useState(false);
 /*     
    useEffect(() => {
        client.get('/posts').then((res) => setPosts(res.data.data.posts));
          }, []);
*/
    function toggleLike() {
        updateLike(!isLiked)
    }
    return <div className = 'icon-container' onClick={toggleLike} style={divStyle}><img className='post-like' src={like} alt='like'/></div>

    
}

export default PostLike