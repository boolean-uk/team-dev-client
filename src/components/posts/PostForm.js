import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PostForm = ({ handleSubmit, handleChange, error }) => {
	return (
		<form className='post-form' onSubmit={handleSubmit}>
			<TextField
				className='user-form-input'
				type='text'
				label='New Post'
				variant='outlined'
				name='content'
				onChange={handleChange}
			/>
			<Button type='submit' variant='contained'>
				Create Post
			</Button>
			{error === 'Please provide content' && (
				<div className='error'>{error}</div>
			)}
		</form>
	);
};

export default PostForm;
