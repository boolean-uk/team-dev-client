import CommentItem from './CommentItem';

const PostComments = ({ userId, post, comments, setPostResponse, margin }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <CommentItem
          userId={userId}
          post={post}
          comment={comment}
          key={index}
          setPostResponse={setPostResponse}
          margin={margin}
        />
      ))}
    </>
  );
};

export default PostComments;
