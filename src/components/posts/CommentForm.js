import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import client from '../../utils/client';
import { useState } from 'react';

const CommentForm = ({ postId, error, setError, setPosts }) => {
	const [comment, setComment] = useState({ content: '' });
	const createComment = async (event, postId) => {
		event.preventDefault();

		setError(false);
		if (comment.postId !== postId) {
			setError(['Must provide content', postId]);
			return;
		}

		client
			.post(`/post/comment?postId=${postId}`, { ...comment })
			.then((res) => {
				setPosts((prevPosts) => {
					return prevPosts.map((post) => {
						if (post.id === postId) {
							return {
								...post,
								postComments: [...post.postComments, res.data.data],
							};
						} else {
							return post;
						}
					});
				});
			})
			.catch((err) => {
				setError([err.response.data.data.err, postId]);
				console.error(err.response.data.data.err);
			});

		setComment({ content: '' });
		event.target.reset();
	};

	const handleChangeComment = (event, postId) => {
		setError(false);
		event.preventDefault();
		const { value, name } = event.target;
		setComment({
			...comment,
			[name]: value,
			postId,
		});
	};

	return (
		<>
			<form className='comment-form' onSubmit={(e) => createComment(e, postId)}>
				<TextField
					className='comment-form-input'
					type='text'
					label='New Comment'
					variant='outlined'
					name='content'
					onChange={(e) => handleChangeComment(e, postId)}
				/>
				<Button type='submit' variant='contained'>
					Create Comment
				</Button>
			</form>
			{error[1] === postId && <div className='error'>{error[0]}</div>}
		</>
	);
};

export default CommentForm;
