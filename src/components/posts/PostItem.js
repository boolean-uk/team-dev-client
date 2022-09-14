import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <li className="post-item">
      <div className="post-header-wrap">
        <div className="post-profile-wrap">
          <img
            className="post-profile-img"
            src={post.user.profile.profileImageUrl}
            alt="profile"
          />
          <h3>
            {
              /* <Link to={}}> */
              // to be modified after profile page is built
            }
            {post.user.profile.firstName} {post.user.profile.lastName}
            {/* </Link> */}
          </h3>
        </div>

        <p className="createdAt-time">{post.createdAt}</p>
      </div>

      <p className="post-content">{post.content}</p>
    </li>
  );
};

export default PostItem;
