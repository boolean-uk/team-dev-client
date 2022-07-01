// export const formatDate = (date) => {
// 	date = new Date(date);
// 	const newDate =
// 		date.getDate() +
// 		'/' +
// 		(date.getMonth() + 1) +
// 		'/' +
// 		date.getFullYear() +
// 		' ' +
// 		(date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
// 		':' +
// 		date.getMinutes() +
// 		' ' +
// 		(date.getHours() >= 12 ? 'PM' : 'AM');
// 	return newDate;
// };

export const formatDate = (date) => {
	const d = new Date(date);
	const newDate =
		('0' + d.getDate()).slice(-2) +
		'-' +
		('0' + (d.getMonth() + 1)).slice(-2) +
		'-' +
		d.getFullYear() +
		' ' +
		('0' + d.getHours()).slice(-2) +
		':' +
		('0' + d.getMinutes()).slice(-2);

	return newDate;
};
