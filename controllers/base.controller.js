const mysql = require('mysql');
const config = require('../src/_config/config.db');
const log = require('../src/helpers/log');
const sDeb = require('../src/helpers/ShowDebug');
const BaseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');

const {
    handleResponse
} = require('../src/helpers/handleResponse');
const {
    handleError
} = require('../src/helpers/handleError');

const connection = mysql.createConnection(config);



exports.addEntity = (req, res, next, baseQuery) => {
    connection.query(baseQuery.query, (error, result_email) => {
        if (error) {
            console.error('SQL error: ', error)
            return res.status(403).json({
                error:error
            })
        }
        if (result_email.length != 0) {
            res.status(403).json({
                error: '⚠️ Already existing user! ⚠️'
            })
        }else{
            connection.query(`SELECT * FROM users WHERE pseudo="${req.body.username}";`, (error, result_pseudo) => {
                if (error) {
                    console.error('SQL error: ', error)
                    return res.status(403).json({
                        error:error
                    })
                }
                if (result_pseudo.length != 0) {
                    res.status(403).json({
                        error: '⚠️ Already existing Pseudo! ⚠️'
                    })
                }else{
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        connexion.query(`INSERT INTO users (email,password,pseudo,rank) VALUES ("${req.body.email}","${hash}","${req.body.pseudo}","${"SOLDIER"}");`, (error) => {
                            if (error) {
                                console.error('❌SQL error❌: ', error);
                                return next(error);
                            }
                            res.status(201).json({
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
    })
    // // log.c('baseController',19,req.body,console.table(baseQuery));
    // try{
    //     connection.query(baseQuery.query, (error, infos) => {
    //         if (error) {
    //             throw {error,message:'🛑 Internal error 🛑'};
    //         } else {
    //             const entityQuery = BaseQuery.selectEntity(baseQuery.table, infos.insertId);
    //             // log.c('baseController',25);
    //             connection.query(entityQuery.query, (error, entity) => {
    //                 if (error) {
    //                     // log.c('baseController',27,error);
    //                     throw {error,message:'🛑 Internal error 🛑'};
    //                 } else {
    //                     // log.c('baseController',30,entity);
    //                     if(entity.length === 0){return handleError({message:'sql query failed'}, res);}
    //                     return handleResponse(entity, res, `✅ INSERT INTO ${baseQuery.table} !`);
    //                 }
    //             });
    //         }
    //     });
    // }catch(error){
    //     return res.status(403).send({error,message:'🛑 Internal error 🛑'});
    // }
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
    const editQuery = BaseQuery.editEntity(baseQuery.table, req.body);
    connection.query(editQuery.query, (error, updatedInfos) => {
        if (error) {
            return handleError(error, res);
        } else {
            if(updatedInfos.affectedRows === 0 ){return handleError({message:'sql query failed'}, res,400);}
            const entityQuery = BaseQuery.selectEntity(baseQuery.table,updatedInfos.insertId);
            connection.query(entityQuery.query, (error, updatedEntity) => {
                if (error) {
                    return handleError(error, res);
                } else {
                    return handleResponse(updatedEntity, res, `✅ UPDATE ${baseQuery.table} !`);
                }
            });
        }
    });
}
exports.deleteEntity = (req, res, next, baseQuery) => {
    connection.query(baseQuery.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            if(infos.affectedRows === 0){return handleError({message:'sql query failed'}, res,403);}
            return handleResponse(infos, res, `✅ DELETE ${baseQuery.table} !`);
        }
    });
}