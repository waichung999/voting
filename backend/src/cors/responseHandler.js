const getErrorStatus = require('../constant/ErrorData');

function findErrorMessage(status) {
	return getErrorStatus.ERROR_STATUS_ARRAY.find(v => v.status == status) || { error: 'There must be an error' };
}

/**
		* Success Reposnse.
		* @param {number} status - Success response status
		* @param {boolean} success - success status
		* @param {any} data - Success response custom data
		* @param {string} message - Success response message
	*/
let sucessResponse = (status, success, data, message ) => {
	return {
		status,
		success,
		data,
		message
	}
}

/**
		* Error Reposnse.
		* @param {Response} res - Send error response
		* @param {number} statusCode - Error Status Code
	*/
let errorResponse = (statusCode) => {
	return findErrorMessage(statusCode);
}


module.exports = {
	errorResponse,
	sucessResponse,
};
