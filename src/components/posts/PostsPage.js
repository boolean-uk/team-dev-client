import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import client from '../../utils/client';
import Posts from './Posts';
import './style.css';

const PostsPage = () => {
	const [post, setPost] = useState({ content: '' });
	const [postResponse, setPostResponse] = useState('');
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(false);
	const [count , setCount] = useState(0)

	useEffect(() => {
		client.get('/posts').then((res) => {
			setPosts(res.data.data.posts);
		});
	}, [count]);

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
			[name]: value,
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
						count={count}
						setCount={setCount}
						setPosts={setPosts}
						showAllComments={showAllComments}
						setError={setError}
					/>
				)}
			</section>
		</>
	);
};

export default PostsPage;
