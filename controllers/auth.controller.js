const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('../src/_config/config.db');

const { handleResponse } = require('../src/helpers/handleResponse');
const { handleError } = require('../src/helpers/handleError');
const { handlerCookie } = require('../src/helpers/HandlerCookie');

const connection = mysql.createConnection(config);

exports.authControl = (userId, currentUser) => {
        return userId == currentUser ? true : false
}

exports.login = (req, res, next) => {
    connection.query(`SELECT * FROM user WHERE mail="${req.body.mail}"`, (error, users) => {
        if (error) {
            return handleError(error, res,500,'🛑 Internal error 🛑');
        } else {
            if (users.length == 0) {
                return handleError(error, res,401,'🛑⚠️ The identifiers are wrong ! ⚠️🛑 \n Connection Failure : 🔴');
            }
            bcrypt.compare(req.body.password, users[0].password)
            .then(valid => {
                if (!valid) {
                    return handleError(error, res,401,'🛑⚠️ The identifiers are wrong ! ⚠️🛑 \n Connection Failure : 🔴');
                }
                handlerCookie.attachCookieToResponse({ res, user:users[0]});
                return handleResponse(users[0], res, `Logged in successfully : 🟢`);
            })

            .catch(error => handleError(error, res,500,'🛑 Internal error 🛑'));
        }
}); 
}