import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CommentForm = ({
	handleSubmitComment,
	handleChangeComment,
	postId,
	error,
}) => {
	return (
		<>
			<form
				className='comment-form'
				onSubmit={(e) => handleSubmitComment(e, postId)}
			>
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
