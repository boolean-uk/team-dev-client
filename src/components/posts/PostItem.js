const PostItem = ({ post }) => {
  return (
    <li className="post-item">
      <div className="post-header-wrap">
        <div className="post-profile-wrap">
          <img
            className="post-profile-img"
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            alt="profile"
          />
          <h3>
            {post.author.firstName} {post.author.lastName}
          </h3>
        </div>

        <p className="createdAt-time">{post.createdAt}</p>
      </div>

      <p className="post-content">{post.content}</p>
    </li>
  );
};

export default PostItem;
