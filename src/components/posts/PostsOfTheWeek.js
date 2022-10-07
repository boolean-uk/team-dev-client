import PostItem from './PostItem';

const PostsOfTheWeek = ({ posts, setPost, setPostResponse }) => {
  const postsOfTheWeek = posts.map(post => {
    post.isPostOfTheWeek = true;
    return post;
  });

  return (
    postsOfTheWeek?.length > 0 && (
      <ul className="posts-list">
        {postsOfTheWeek?.map((post, index) => (
          <PostItem
            post={post}
            key={index}
            setPost={setPost}
            setPostResponse={setPostResponse}
          />
        ))}
      </ul>
    )
  );
};

export default PostsOfTheWeek;
