import Comments from "./Comments";
import CommentForm from "./CommentForm";

export default function Posts({
	posts,
	showAllComments,
	createComment,
	handleChangeComment,
}) {
	let commentLength = 0;
	return (
		<ul className="posts-list">
			{posts &&
				posts.map((post, index) => (
					<div className="post-comment-container">
						<li key={index} className="post-item">
							{post.content}
						</li>
						<Comments
							key={post.id}
							post={post}
							showAllComments={showAllComments}
							commentLength={commentLength}
						/>

						<CommentForm
							handleSubmitComment={createComment}
							postId={post.id}
							handleChangeComment={handleChangeComment}
						/>
					</div>
				))}
		</ul>
	);
}
