const baseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const baseController = require('./base.controller');

class UserController{

    selectAll = (req, res, next) => {
        baseController.selectAll(req, res, next,baseQuery.selectAll('user'));
    }

    addEntity = (req, res, next) => {
        baseController.addEntity(req, res, next,baseQuery.addEntity('user',req.body));
    }
    
    selectEntity = (req, res, next) => {
        baseController.selectEntity(req, res, next,baseQuery.selectEntity('user',req.body.id));
    }

    editEntity = (req, res, next) => {
        baseController.editEntity(req, res, next,baseQuery.editEntity('user',req.body));
    }

    deleteEntity = (req, res, next) => {
        baseController.deleteEntity(req, res, next,baseQuery.deleteEntity('user',req.params.id));
    }

    

}
const userController = new UserController();
module.exports = userController;
