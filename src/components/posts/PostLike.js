import like from "./like.png";
import React from "react";
import { useState } from "react";
import "./style.css";

const PostLike = () => {
  const [divStyle, updateLike] = useState({
    backgroundImage: "radial-gradient(lightgrey 60%, darkgrey 40%)",
  });

  function toggleLike() {
    const updatedStyle =
      divStyle.backgroundImage === "radial-gradient(#1976d2 60%, orange 40%)"
        ? { backgroundImage: "radial-gradient(lightgrey 60%, darkgrey 40%)" }
        : { backgroundImage: "radial-gradient(#1976d2 60%, orange 40%)" };
    updateLike(updatedStyle);
  }

  return (
    <div className="like-section">
      <p className="like-label">Likes: 3</p>
      <div className="icon-container" onClick={toggleLike} style={divStyle}>
        <img className="post-like" src={like} alt="like" />
      </div>
    </div>
  );
};

export default PostLike;
