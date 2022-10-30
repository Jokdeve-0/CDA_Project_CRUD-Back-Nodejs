const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('../src/_config/config.db');
const baseController = require('./base.controller')

const handlerCookie = require('../src/helpers/HandlerCookie');
const log = require('../src/helpers/log');

const connection = mysql.createConnection(config);

exports.authControl = (userId, currentUser) => {
        return userId == currentUser ? true : false
}

exports.signup = (req, res, next) => {
    baseController.signup(req, res, next);
}


exports.login = (req, res, next) => {
    try{
    connection.query(`SELECT * FROM user WHERE mail="${req.body.mail}"`, (error, users) => {
        if (error) {
            log.c('authController',25,error)
            return res.status(403).json({
                error
            })
        } else {
            if (users.length == 0) {
                log.c('authController',31,users)
                res.status(403).json({
                    error: '🛑 The identifiers are wrong !\n Connection Failure : 🔴'
                })
            }
            bcrypt.compare(req.body.password, users[0].password)
            .then(valid => {
                if (!valid) {
                    log.c('authController',39,valid)
                    res.status(403).json({
                        error: '🛑 The identifiers are wrong !\n Connection Failure : 🔴'
                    })
                }
                log.c('authController',44,users)
                handlerCookie.attachCookieToResponse({ res, user:users[0]});
                
            })
            .catch(error => res.status(500).json({
                error
            }))
        }
    }); 
}catch(e){
    console.log(e,e.message)
}
}