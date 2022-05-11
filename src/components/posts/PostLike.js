import like from './like.png';
import React from 'react';
import { useState, useEffect } from 'react';
import client from '../../utils/client';
import './style.css';
import colours from '../../utils/colours';

const PostLike = ({likes=[], postId, userId}) => { 

const blue = colours.blue;
const grey = colours.grey;

const [divStyle, updateStyle] = useState({ backgroundColor: grey });
const [postLikes,updateLikes] = useState(likes);
const [id, updateId] = useState('');
const [talkingToServer, updateTalkStatus] = useState(false);

useEffect(()=>{
  const like = likes.find(like => String(like.userId) === userId); // checks if user has liked the post
  if (like){
    updateStyle({backgroundColor: blue});
    updateId(like.id);
  }
},[]);

  function likePost(event){
  updateTalkStatus(true);
  client.post(`/post/${postId}/like/`)
  .then(res => {
    updateId(_ => res.data.data.id);
    updateLikes(likes => [res.data.data, ...likes]);
    updateStyle({backgroundColor: blue});
  })
  .catch((err) => {
    console.log({error: `when liking post: ${err.message}`});
  })
  .finally(() => updateTalkStatus(false));
  }

  function unlikePost(event){
    updateTalkStatus(true);
    client.delete(`/post/like/${id}`)
    .then(_ => {
      updateLikes(likes => likes.filter(like => like.id !== id));
      updateStyle({backgroundColor: grey});
    })
    .catch((err) => {
      console.log({error: `when unliking post: ${err.message}`});
    })
    .finally(() => updateTalkStatus(false));
  }

function toggleLike(event) {
  if (talkingToServer) return;
  if (divStyle.backgroundColor === grey) likePost(event);
  else if (divStyle.backgroundColor !== grey) unlikePost(event);
}

    return <div className = 'like-section'>
    <p>Likes: {postLikes.length}</p>
    <div className = 'icon-container' onClick={toggleLike} style={divStyle}>
      <img className='post-like' src={like} alt='like'/>
      </div>
    </div>;
};

export default PostLike;