const bcrypt = require('bcrypt');
const mysql = require('mysql');
const config = require('../src/_config/config.db');
const log = require('../src/helpers/log');
const sDeb = require('../src/helpers/ShowDebug');
const BaseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const { handleError } = require('../src/helpers/handleError');
const { handleResponse } = require('../src/helpers/handleResponse');

const connection = mysql.createConnection(config);


exports. signup = (req, res, next) => {
    const baseQuery = BaseQuery.addEntity('user',req.body);
    connection.query(`SELECT * FROM ${baseQuery.table} WHERE ${baseQuery.table}.username='${req.body.username}' OR ${baseQuery.table}.mail='${req.body.mail}';`, (error, existingParams) => {
        if (error) {
            return res.status(403).json({
                error:error
            })
        }
        if (existingParams.length != 0) {
            res.status(403).json({
                error: '⚠️ Already existing identifiers ! ⚠️'
            })
        }else{
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                console.log(hash)
                const baseQuerySignup = BaseQuery.signup('user',req.body,hash);
                connection.query(baseQuerySignup.query, (error,entity) => {
                    if (error) {
                        return res.status(403).json({
                            error:error
                        })
                    }
                    res.status(200).json({
                        entity,
                        message: '✅ Registered user ! ✅'
                    })
                })
            })
            .catch(error => res.status(500).json({
                error: error
            }))
        }
    })
}
exports.addEntity = (req, res, next, baseQuery) => {
    try{
        connection.query(baseQuery.query, (error, existingParams) => {
            if (error) {
                console.error('SQL error: ', error)
                return res.status(403).json({
                    error:error.sqlMessage
                })
            }else{
                console.log(existingParams)
                const selectQuery = BaseQuery.selectEntity(baseQuery.table,existingParams.insertId);
               console.log('SQL',selectQuery)
                connection.query(selectQuery.query,(error, entity)=>{
                    if (error) {
                        console.error('SQL error: ', error)
                        return res.status(403).json({
                            error:error
                        })
                    }else{
                        console.log(entity)
                        res.status(201).json({
                            entity,
                            message: '✅ Registered Entity ! ✅'
                        })
                    }
                })
            }
        })
    }catch(error){
        res.status(500).json({error, message: error.message})
    }
}
exports.selectAll = (req, res, next, baseQuery) => {
    connection.query(baseQuery.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(infos, res, `✅ SELECT * from ${baseQuery.table} !`);
        }
    });
}
exports.selectEntity = (req, res, next, baseQuery) => {
    connection.query(baseQuery.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(infos, res, `✅ SELECT ENTITY ${baseQuery.table} !`);
        }
    });
}
exports.editEntity = (req, res, next, baseQuery) => {
    try{
        connection.query(baseQuery.query, (error, infos) => {
            if (error) {
                return res.status(403).json({
                    error:error.sqlMessage
                })
            }else{
                res.status(201).json({
                    infos,
                    message: '✅ Updated Entity ! ✅'
                })
            }
        })
    }catch(error){
        res.status(500).json({error, message: error.message})
    }
}
exports.deleteEntity = (req, res, next, baseQuery) => {

    try{
        connection.query(baseQuery.query, (error, entity) => {
            if (error) {
                console.error('SQL error: ', error)
                return res.status(403).json({
                    error:error.sqlMessage
                })
            }else{
                res.status(201).json({
                    entity,
                    message: '✅ Deleted Entity ! ✅'
                })
            }
        })
    }catch(error){
        res.status(500).json({error, message: error.message})
    }
}