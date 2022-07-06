import Comments from './Comments';
import CommentForm from './CommentForm';
import Post from './Post';

export default function Posts({
	posts,
	showAllComments,
	error,
	setPosts,
	setError,
}) {
	let commentLength = 0;

	return (
		<ul className='posts-list'>
			{posts &&
				posts.map((post, index) => (
					<div key={post.id} className='post-comment-container'>
						<Post key={index} post={post} setPosts={setPosts} />
						<Comments
							post={post}
							showAllComments={showAllComments}
							commentLength={commentLength}
						/>
						<CommentForm
							postId={post.id}
							error={error}
							setError={setError}
							setPosts={setPosts}
						/>
					</div>
				))}
		</ul>
	);
}
