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

const connection = mysql.createConnection(config);



exports.createDatabase = (req, res, next) => {
    connection.query(createTable.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(infos, res, "✅ all tables have been created !");
        }
    });
}
exports.addFixtures = (req, res, next) => {
    connection.query(insertFixtures.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(infos, res, "✅ all fixtures have been created !");
        }
    });
}
exports.removeAllDatas = (req, res, next) => {
    connection.query(deleteTable.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            connection.query(createTable.query, (error, infos) => {
                if (error) {
                    return handleError(error, res);
                } else {
                    return handleResponse(infos, res, "✅ all datas has been deleted !");
                }
            });
        }
    });
}
exports.showTables = (req, res, next) => {
    connection.query(showTable.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(infos, res, "✅ show all tables names !");
        }
    });
}
exports.deleteDatabase = (req, res, next) => {
    connection.query(deleteTable.query, (error, infos) => {
        if (error) {
            return handleError(error, res);
        } else {
            return handleResponse(infos, res, "✅ all Tables has been deleted!");
        }
    });
}