import Comments from './Comments';
import CommentForm from './CommentForm';
import { Button } from '@mui/material';
import client from '../../utils/client';
import { useState } from 'react';

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
	const [isDeleteing, setIsDeleting] = useState(false)
	

	const deletePostHandler = (event, postId) => {
		event.preventDefault();
		if(isDeleteing){
			client
			  .delete(`/post/posts/${postId}`)
			  .then((res) => {
				if(posts.length === 1){
					setPosts([])
				}else{
					setCount(count+1)
				}setIsDeleting(false)
			  })
			  .catch((err) => console.error(err.response))
		}else{
			setIsDeleting(true)
		}
	  };

	let commentLength = 0;
	return (
		<ul className='posts-list'>
			{posts &&
				posts.map((post, index) => (
					<div key={post.id} className='post-comment-container'>
						<li key={index} className='post-item'>
							{post.content}
						<Button className='delete-btn' size='small' variant='contained' color={isDeleteing ? 'error' : 'primary'} onClick={(event) => deletePostHandler(event, post.id)}>{isDeleteing ? 'Confirm': 'Delete'}</Button>
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
