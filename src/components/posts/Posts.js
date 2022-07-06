import Comments from './Comments';
import CommentForm from './CommentForm';

export default function Posts({
	posts,
	showAllComments,
	createComment,
	handleChangeComment,
	error,
}) {
	let commentLength = 0;
	return (
    <ul className='posts-list'>
      {posts &&
        posts.map((post, index) => (
          <div key={post.id} className='post-comment-container'>
            <li key={index} className='post-item'>
              <img src={post.user.profile.profileUrl} alt='user-avatar' />
              <p>{post.content}</p>
            </li>
            <Comments
              post={post}
              showAllComments={showAllComments}
              commentLength={commentLength}
            />
            <CommentForm
              handleSubmitComment={createComment}
              postId={post.id}
              handleChangeComment={handleChangeComment}
              error={error}
            />
          </div>
        ))}
    </ul>
  );
}
