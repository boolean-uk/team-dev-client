export const formatDate = (date) => {
	const dateToFormat = new Date(date);
	const newDate =
		('0' + dateToFormat.getDate()).slice(-2) +
		'-' +
		('0' + (dateToFormat.getMonth() + 1)).slice(-2) +
		'-' +
		dateToFormat.getFullYear() +
		' ' +
		('0' + dateToFormat.getHours()).slice(-2) +
		':' +
		('0' + dateToFormat.getMinutes()).slice(-2);

	return newDate;
};
