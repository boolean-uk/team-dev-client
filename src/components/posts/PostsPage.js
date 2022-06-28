import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import CommentForm from "./CommentForm";
import client from "../../utils/client";
import Button from "@mui/material/Button";
import Comment from "./Comment";
import "./style.css";

import Header from "../Header/Header";

const PostsPage = () => {
	const [post, setPost] = useState({ content: "" });
	const [postResponse, setPostResponse] = useState("");
	const [posts, setPosts] = useState([]);
	const [comment, setComment] = useState({ content: "" });
	const [comments, setComments] = useState([]);
	const [commentsToDisplay, setCommentsToDisplay] = useState([]);

	let commentLength = 0;

	let navigate = useNavigate();

	console.log("COMMENT ARRAY:", comments);
	console.log("POSTS:", posts);

	useEffect(() => {
		client.get("/posts").then((res) => {
			console.log(res);
			setPosts(res.data.data.posts);
			findFirstComment();
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
		console.log("POSTID IN CREATECOMMENT:", postId);
		client
			.post(`/post/comment?postId=${postId}`, { ...comment })
			.then((res) => {
				setComments((prevComments) => [...prevComments, res.data.data]);
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

	const formatDate = (date) => {
		date = new Date(date);
		const newDate =
			date.getDate() +
			"/" +
			(date.getMonth() + 1) +
			"/" +
			date.getFullYear() +
			" " +
			(date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
			":" +
			date.getMinutes() +
			" " +
			(date.getHours() >= 12 ? "PM" : "AM");
		return newDate;
	};

	async function findFirstComment() {
		const res = await client.get(`/posts/comment`);

		const data = res.data.data.comment;

		setComments(data);

		console.log("DATA:", data);
	}

	function showAllComments(e, postId) {
		console.log(postId);

		const currComments = comments.filter(
			(comment) => comment.postId === postId
		);

		setCommentsToDisplay(currComments);
	}

	function displayComments(postId) {
		console.log("INSIDE DISPLAYSOMMENTS");
		return (
			commentsToDisplay.length > 1 &&
			commentsToDisplay[0]?.postId === postId &&
			commentsToDisplay.map((comment, i, arr) => {
				commentLength = arr.length;
				return <Comment comment={comment} formatDate={formatDate} />;
			})
		);
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
				<ul className="posts-list">
					{posts &&
						posts.map((post, index) => (
							<div className="post-comment-container">
								<li key={index} className="post-item">
									{post.content}
								</li>
								<div className="comments">
									{displayComments(post.id) ||
										comments
											.filter((comment) => {
												return comment.postId === post.id;
											})
											.map((comment, i, arr) => {
												commentLength = arr.length;
												return (
													<Comment comment={comment} formatDate={formatDate} />
												);
											})
											.slice(-1)}

									{commentLength > 1 && (
										<Button
											onClick={(e) => showAllComments(e, post.id)}
											type="submit"
											variant="contained"
											color="success"
										>
											{commentsToDisplay[0]?.postId === post.id
												? "All comments displayed"
												: `Show All Comments (${commentLength})`}
										</Button>
									)}
								</div>
								<CommentForm
									handleSubmitComment={createComment}
									postId={post.id}
									handleChangeComment={handleChangeComment}
								/>
							</div>
						))}
				</ul>
			</section>
		</>
	);
};

export default PostsPage;
