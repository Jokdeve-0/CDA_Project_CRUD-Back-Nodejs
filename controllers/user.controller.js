const log = require('../src/helpers/log.js');
const baseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const baseController = require('./base.controller');

class UserController{

    selectAll = (req, res, next) => {
        baseController.selectAll(req, res, next,baseQuery.selectAll('user'));
    }

    addEntity = (req, res, next) => {
        // log.c('UserController',16,req.body)
        // Reflect.deleteProperty(req.body, 'unique');
        // log.c('UserController',18,req.body)
        baseController.addEntity(req, res, next,baseQuery.addEntity('user',req.body.user));
    }
    
    selectEntity = (req, res, next) => {
        baseController.selectEntity(req, res, next,baseQuery.selectEntity('user',req.body.id));
    }

    editEntity = (req, res, next) => {
        baseController.editEntity(req, res, next,baseQuery.selectEntity('user',req.body.id));
    }

    deleteEntity = (req, res, next) => {
        baseController.deleteEntity(req, res, next,baseQuery.deleteEntity('user',req.params.id));
    }

    

}
const userController = new UserController();
module.exports = userController;
