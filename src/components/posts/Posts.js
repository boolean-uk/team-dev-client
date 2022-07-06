import Comments from './Comments';
import CommentForm from './CommentForm';
import { Button } from '@mui/material';
import client from '../../utils/client';

export default function Posts({
	setPosts,
	posts,
	showAllComments,
	createComment,
	handleChangeComment,
	error,
	count,
	setCount
}) {

	const deletePostHandler = (event, postId) => {
		event.preventDefault();
		client
		  .delete(`/post/posts/${postId}`)
		  .then((res) => {
			if(posts.length === 1){
				setPosts([])
			}else{
				setCount(count+1)
			}
		  })
		  .catch((err) => console.error(err.response))
		  
	  };

	let commentLength = 0;
	return (
		<ul className='posts-list'>
			{posts &&
				posts.map((post, index) => (
					<div key={post.id} className='post-comment-container'>
						<li key={index} className='post-item'>
							{post.content}
						<Button variant='contained' onClick={(event) => deletePostHandler(event, post.id)}>Delete Post</Button>
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
