import PostItem from './PostItem';

const PinnedPost = ({
  posts,
  setPost,
  setPostResponse,
  setErrorPinPost,
  setErrorPrivatePost,
}) => {
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
            setPost={setPost}
            setPostResponse={setPostResponse}
            setErrorPinPost={setErrorPinPost}
            setErrorPrivatePost={setErrorPrivatePost}
          />
        ))}
      </ul>
    )
  );
};

export default PinnedPost;
