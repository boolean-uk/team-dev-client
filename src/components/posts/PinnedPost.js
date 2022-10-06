import PostItem from './PostItem';

const PinnedPost = ({ posts, getUserId, setPost, setPostResponse }) => {
  const pinnedPost = posts.map(post => {
    post.isPinnedPost = true;
    return post;
  });

  return (
    pinnedPost?.length > 0 && (
      <ul className="posts-list">
        {pinnedPost?.map((post, index) => (
          <PostItem
            post={post}
            key={index}
            userId={getUserId}
            setPost={setPost}
            setPostResponse={setPostResponse}
          />
        ))}
      </ul>
    )
  );
};

export default PinnedPost;
