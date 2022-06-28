import { formatDate } from "../../Helper/dateFormatter";

export default function Comment({ comment }) {
	return (
		<li>
			<div className="name-time-container">
				<div className="name">
					{comment.profile.firstName + " "}
					{comment.profile.lastName}
				</div>
				<div className="time">{formatDate(Date.parse(comment.createdAt))}</div>
			</div>
			{comment.content}
		</li>
	);
}
