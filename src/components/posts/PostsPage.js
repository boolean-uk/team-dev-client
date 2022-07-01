import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import Posts from './Posts';
import './style.css';

const PostsPage = () => {
	const [post, setPost] = useState({ content: '' });
	const [postResponse, setPostResponse] = useState('');
	const [posts, setPosts] = useState([]);
	const [comment, setComment] = useState({ content: '' });
	const [error, setError] = useState(false);

	useEffect(() => {
		client.get('/posts').then((res) => {
			setPosts(res.data.data.posts);
		});
	}, []);

	const createPost = async (event) => {
		setError(false);
		event.preventDefault();
		try {
			const res = await client.post('/post', post);
			setPostResponse(res.data);
			const res2 = await client.get('/posts');
			setPosts(res2.data.data.posts);
		} catch (err) {
			setError(err.response.data.data.err);
		}
	};

	const handleChange = (event) => {
		setError(false);
		event.preventDefault();
		const { value, name } = event.target;
		setPost({
			...post,
			[name]: value,
		});
	};

	const createComment = (event, postId) => {
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
							post.postComments.push(res.data.data);
							return post;
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

	function showAllComments(e, postId) {
		setPosts((prevPosts) => {
			return prevPosts.map((post) => {
				if (+post.id === +postId) {
					if (post.showAllComments === true)
						return { ...post, showAllComments: false };
					return { ...post, showAllComments: true };
				} else {
					return { ...post, showAllComments: false };
				}
			});
		});
	}

	return (
		<>
			<section className='posts-section'>
				<p>Status: {postResponse.status}</p>
				<PostForm
					error={error}
					handleSubmit={createPost}
					handleChange={handleChange}
				/>
				{posts && (
					<Posts
						error={error}
						posts={posts}
						showAllComments={showAllComments}
						createComment={createComment}
						handleChangeComment={handleChangeComment}
					/>
				)}
			</section>
		</>
	);
};

export default PostsPage;
