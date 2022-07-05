import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext, useState } from 'react';
import client from '../../utils/client';
export default function Post({ post, setPosts }) {
	const { loggedInUser } = useContext(loggedInUserContext);
	const checkIfEditing = (post) => {
		return isEditing.editing && post.id === isEditing.postId;
	};
	const [postEdit, setPostEdit] = useState({ content: '' });
	const [isEditing, setIsEditing] = useState({ editing: false, postId: null });

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
				<button
					className='post_edit_button'
					onClick={(e) => handlePostEdit(e, post.id, post.content)}
				>
					{checkIfEditing(post) ? 'Save' : 'Edit Post'}
				</button>
			)}
		</li>
	);
}
