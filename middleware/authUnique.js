
const mysql = require('mysql');

const config = require('../src/_config/config.db');
const connection = mysql.createConnection(config);
const {
    handleResponse
} = require('../src/helpers/handleResponse');
const {
    handleError
} = require('../src/helpers/handleError');
const log = require('../src/helpers/log');

exports.userUniqueCheck= (req, res, next) => {
    const { entity } = req.body;
    const { table } = req.body;
    const { unique } = req.body;
    log.c("userUniqueCheck",18,entity,'entity');
    log.c("userUniqueCheck",19,table,'table');
    log.c("userUniqueCheck",20,unique,'unique');
    let uniqueCols = [];
    let uniqueVals = [];
    for (const property in unique) {
        uniqueCols.push(property);
        uniqueVals.push(unique[property]);
    }
    try{
    for(let idx = 0; idx < uniqueCols.length; idx++){
        log.c("userUniqueCheck",28,{},`SELECT * FROM ${table} WHERE ${table}.${uniqueCols[idx]}="${entity[uniqueVals[idx]]}" ;`)
        connection.query(`SELECT * FROM ${table} WHERE ${table}.${uniqueCols[idx]}='${entity[uniqueVals[idx]]}' ;`, (error, isExist) => {
            
                if (error) {
                    throw new Error('🛑 Internal error 🛑');
                } else {
                    if (isExist.length != 0) {
                        return res.status(403).send({message:'coucou'});
                        // throw {error:`The ${uniqueCols[idx]} is already in use, please choose another one .`};
                    }else{
                        next();       
                    }     
                }
            });
        }
    }catch(e){
        return res.status(403).send(e);
    }
}
