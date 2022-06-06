// @file erratum.js
class Erratum {
	constructor(concern, portion, status, genre) {
		if (Array.isArray(concern)) {
			concern = concern.join(';');
		}
		if (typeof concern === 'object') {
			concern = concern.message;
		}
		let message = !!portion ? `[${portion}] ${concern}` : concern;
		let error = new Error(message);
		if (!!status) {
			error.status = status;
		}
		if (!!portion) {
			error.module = portion;
		}
		if (!!genre) {
			error.type = genre;
		}
		console.error(error);
		return error;
	}
}

module.exports = Erratum;