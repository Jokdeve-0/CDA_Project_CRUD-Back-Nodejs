const HttpStatus = require('http-status-codes');
exports.handleResponse = (results, res, message) => {
    return res.status(HttpStatus.StatusCodes.ACCEPTED).send({
        message,
        results
    });
}