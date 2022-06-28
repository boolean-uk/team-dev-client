import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import client from "../../utils/client";
import Posts from "./Posts";
import "./style.css";

import Header from "../Header/Header";

const PostsPage = () => {
	const [post, setPost] = useState({ content: "" });
	const [postResponse, setPostResponse] = useState("");
	const [posts, setPosts] = useState([]);
	const [comment, setComment] = useState({ content: "" });
	let navigate = useNavigate();

	useEffect(() => {
		client.get("/posts").then((res) => {
			console.log(res);
			setPosts(res.data.data.posts);
		});
	}, []);

	const createPost = async (event) => {
		event.preventDefault();
		client
			.post("/post", post)
			.then((res) => setPostResponse(res.data))
			.catch((data) => {
				console.log(data);
			});
	};

	const handleChange = (event) => {
		event.preventDefault();
		const { value, name } = event.target;
		setPost({
			...post,
			[name]: value,
		});
	};

	const signOut = (event) => {
		event.preventDefault();
		localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
		navigate("../", { replace: true });
	};

	const createComment = (event, postId) => {
		event.preventDefault();
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
			.catch((data) => {
				console.log(data);
			});
		event.target.reset();
	};

	const handleChangeComment = (event) => {
		event.preventDefault();
		const { value, name } = event.target;
		setComment({
			...comment,
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
			<Header companyName={`Cohort Manager 2.0`} />
			<section className="posts-section">
				<button id="user-signout-button" onClick={signOut}>
					sign out
				</button>
				<p>Status: {postResponse.status}</p>
				<PostForm handleSubmit={createPost} handleChange={handleChange} />
				{posts && (
					<Posts
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
