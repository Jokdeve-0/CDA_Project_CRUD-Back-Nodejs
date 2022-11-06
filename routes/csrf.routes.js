const cookieParser = require('cookie-parser');
const {randomBytes} = require('crypto');
const StatusCodes = require('http-status-codes');

exports.csrfRoutes = (router) =>{
        router.use(cookieParser());
        router.get('/csrfToken', (request, response) => {
        const csrfToken = randomBytes(64).toString('hex');
        response.cookie('csrf', csrfToken, {
            secure: process.env.NODE_ENV !== 'development',
            domain: process.env.DOMAIN_NAME,
        });
        response
            .status(StatusCodes.NO_CONTENT)
            .send();
        });
}