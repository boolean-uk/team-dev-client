import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext, useState } from 'react';
import client from '../../utils/client';
import { Button } from '@mui/material';

export default function Post({ post, setPosts, posts,count, setCount }) {
	const { loggedInUser } = useContext(loggedInUserContext);
	const checkIfEditing = (post) => {
		return isEditing.editing && post.id === isEditing.postId;
	};
	const [postEdit, setPostEdit] = useState({ content: '' });
	const [isEditing, setIsEditing] = useState({ editing: false, postId: null });
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

	const handleChange = (event) => {
		event.preventDefault();
		const { value, name } = event.target;
		setPostEdit({
			[name]: value,
		});
	};
	const handlePostEdit = async (event, postId, content) => {
		event.preventDefault();
		if (event.target.innerText === 'Save') {
			await client.patch(`/post/${postId}`, postEdit);
			const res2 = await client.get('/posts');
			setPosts(res2.data.data.posts);
			setIsEditing({ editing: false, postId: postId });
			setPostEdit({ content: '' });
			return;
		}
		if (isEditing.editing === false) {
			setIsEditing({ editing: true, postId: postId });
			setPostEdit({ content });
		} else {
			setIsEditing({ editing: false, postId: postId });
		}
	};

	return (
		<li className={checkIfEditing(post) ? 'editing post-item' : 'post-item'}>
			{(checkIfEditing(post) && (
				<textarea
					name='content'
					defaultValue={post.content}
					onChange={(e) => handleChange(e)}
					size={30}
				></textarea>
			)) ||
				post.content}
			{loggedInUser.id === post.user.id && (
				<div className='button-container'>
					<Button className='delete-btn' size='small' variant='contained' color={isDeleteing ? 'error' : 'primary'} onClick={(event) => deletePostHandler(event, post.id)}>{isDeleteing ? 'Confirm': 'Delete'}</Button>
					<button
						className='post_edit_button'
						onClick={(e) => handlePostEdit(e, post.id, post.content)}
					>
						{checkIfEditing(post) ? 'Save' : 'Edit Post'}
					</button>
				</div>
			)}
			{<p className='edited'>{post.edited ? 'Edited' : ''}</p>}
		</li>
	);
}
