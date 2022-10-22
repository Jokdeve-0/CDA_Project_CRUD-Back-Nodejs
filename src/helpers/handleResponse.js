const HttpStatus = require('http-status-codes');
exports.handleResponse = (infos, res, message) => {
    return res.status(HttpStatus.StatusCodes.ACCEPTED).send({
        message,
        infos
    });
}