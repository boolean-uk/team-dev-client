export const formatDate = (date) => {
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
