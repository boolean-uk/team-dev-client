import Comments from './Comments';
import CommentForm from './CommentForm';

export default function Posts({
	posts,
	showAllComments,
	createComment,
	handleChangeComment,
	error,
	isEditing,
	setIsEditing,
	handlePostEdit
}) {
	let commentLength = 0;
	return (
		<ul className='posts-list'>
			{posts &&
				posts.map((post, index) => (
					<div key={post.id} className='post-comment-container'>
						<li key={index} className='post-item'>
							{	(isEditing.editing && post.id === isEditing.postId  &&
								<input value={post.content}></input>)
							 ||
							post.content}
							<button className='post_edit_button' onClick={(e) => handlePostEdit(e,post.id)}>Edit Post</button>
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
