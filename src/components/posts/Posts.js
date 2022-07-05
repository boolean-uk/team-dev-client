import Comments from './Comments';
import CommentForm from './CommentForm';
import Post from './Post';

export default function Posts({
	posts,
	showAllComments,
	error,
	setPost,
	setPosts,
	setError,
}) {
	let commentLength = 0;

	console.log(posts);
	return (
		<ul className='posts-list'>
			{posts &&
				posts.map((post, index) => (
					<div key={post.id} className='post-comment-container'>
						<Post
							key={index}
							post={post}
							setPost={setPost}
							setPosts={setPosts}
						/>
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
