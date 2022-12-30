const mysql = require('mysql');
const config = require('../src/_config/config.db');
const log = require('../src/helpers/log');
const {
  createTable,
  deleteTable,
  insertFixtures,
  showTable,
} = require('../src/scripts/SQL_QUERY/CreateTable');
const { handleResponse } = require('../src/helpers/handleResponse');
const { handleError } = require('../src/helpers/handleError');
const CreateTable = require('../src/scripts/SQL_QUERY/CreateTable');
// just for create database
const startingConfig = require('../src/_config/startingConfig.db');

const connection = mysql.createConnection(config);

exports.createTables = (req, res, next) => {
  try{
    connection.query(createTable.query, (error, results) => {
      if (error) {
        console.error('SQL error: ', error)
        return res.status(403).json({
          error: error.sqlMessage
        })
      } else {
        res.status(200).json({
          results,
          message: '✅ all tables have been created !'
        })
      }
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}
exports.addFixtures = (req, res, next) => {
  try{
    connection.query(insertFixtures.query, (error, results) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(results, res, "✅ all fixtures have been created !");
        }
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}
exports.removeAllDatas = (req, res, next) => {
  try {
    connection.query(deleteTable.query, (error, results) => {
      if (error) {
        console.error('SQL error: ', error)
        return res.status(403).json({
          error: error.sqlMessage
        })
      } else {
        connection.query(createTable.query, (error, results) => {
          if (error) {
            console.error('SQL error: ', error)
            return res.status(403).json({
              error: error.sqlMessage
            })
          } else {
            res.status(200).json({
              results,
              message: "✅ all datas has been deleted !"
            }) ;
          }
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}
exports.showTables = (req, res, next) => {  
  try {
    connection.query(showTable.query, (error, results) => {
      if (error) {
        if(error.sqlMessage && error.sqlMessage === "Unknown database 'addictocode_api'"
          || error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'
          ){
            return res.status(200).json({message:'The database not exist'})
          }else{
            return res.status(403).json({error: error.sqlMessage})
          }
      } else {
        res.status(200).json({
          results,
          message: "✅ show all tables names !"
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}
exports.deleteTables = (req, res, next) => {
  try {
    connection.query(deleteTable.query, (error, results) => {
      if (error) {
        console.error('SQL error: ', error)
        return res.status(403).json({
          error: error.sqlMessage
        })
      } else {
        res.status(200).json({
          results,
          message: "✅ all Tables has been deleted!"
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}

exports.createDatabase = (req, res, next) => {
  const connectionDb = mysql.createConnection(startingConfig);
  try {
    connectionDb.query(CreateTable.createDatabase.query, (error, results) => {
      if (error) {
        console.error('SQL error: ', error)
        return res.status(403).json({
          error: error.sqlMessage
        })
      } else {
        res.status(200).json({
          results,
          message: '✅ database created ! ✅'
        })
      }
    })
  } catch (error) {
    res.status(500).json({
      error,
      message: error.message
    })
  }
}