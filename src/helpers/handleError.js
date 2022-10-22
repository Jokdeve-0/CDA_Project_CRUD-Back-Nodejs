const HttpStatus = require('http-status-codes');
exports.handleError = (error, res, code,message) => {
    let codeToGo = 0
    switch (code) {
        case 203:
            codeToGo = HttpStatus.StatusCodes.NON_AUTHORITATIVE_INFORMATION
            break;
        case 400:
            codeToGo = HttpStatus.StatusCodes.BAD_REQUEST;
            break;
        case 404:
            codeToGo = HttpStatus.StatusCodes.NOT_FOUND;
            break;
        case 403:
            codeToGo = HttpStatus.StatusCodes.FORBIDDEN;
            break;
        case 500:
            codeToGo = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
            break;
        default:
            codeToGo = HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    }
    return res.status(codeToGo).send({
        message: error.message,error: message
    });

}