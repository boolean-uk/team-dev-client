import Button from '@mui/material/Button';
import Comment from './Comment';
import './style.css';

export default function Comments({ post, showAllComments, commentLength }) {
	return (
		<>
			<div className='comments'>
				{post.postComments.map((comment, i, arr) => {
					commentLength = arr.length;
					if (post.showAllComments) {
						return <Comment key={comment.id} comment={comment} />;
					} else if (i === arr.length - 1) {
						return <Comment key={comment.id} comment={comment} />;
					} else return null;
				})}
			</div>
			{commentLength > 1 && (
				<div className='btn'>
					<Button
						onClick={(e) => showAllComments(e, post.id)}
						type='submit'
						variant='contained'
						color='success'
					>
						{post.showAllComments
							? 'Hide Comments'
							: `Show All Comments (${commentLength})`}
					</Button>
				</div>
			)}
		</>
	);
}
