import { formatDate } from '../../Helper/dateFormatter';

export default function Comment({ comment }) {
	return (
		<li>
			<div className='comment-container'>
				<div className='name-time-container'>
					<img src={comment.profile.profileUrl} alt='profile-avatar' className='comment-user-image'/>
					<div className='name'>
                     {comment.profile.firstName} {comment.profile.lastName}
					</div>
					<div className='time'>
						{formatDate(Date.parse(comment.createdAt))}
					</div>
				</div>
				<p className='comment-content'> {comment.content}</p>
			</div>
		</li>
	);
}
