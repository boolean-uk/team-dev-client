import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CommentForm = ({ handleSubmitComment, handleChangeComment, postId }) => {
	return (
		<form
			className="comment-form"
			onSubmit={(e) => handleSubmitComment(e, postId)}
		>
			<TextField
				className="comment-form-input"
				type="text"
				label="New Comment"
				variant="outlined"
				name="content"
				onChange={handleChangeComment}
			/>
			<Button type="submit" variant="contained">
				Create Comment
			</Button>
		</form>
	);
};

export default CommentForm;
