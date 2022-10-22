const baseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const baseController = require('./base.controller');

class RoleController{

    selectAll = (req, res, next) => {
        baseController.selectAll(req, res, next,baseQuery.selectAll('role'));
    }
    addEntity = (req, res, next) => {
        baseController.addEntity(req, res, next,baseQuery.addEntity('role',req.body));
    }
    
    selectEntity = (req, res, next) => {
        baseController.selectEntity(req, res, next,baseQuery.selectEntity('role',req.body.id));
    }

    editEntity = (req, res, next) => {
        baseController.editEntity(req, res, next,baseQuery.selectEntity('role',req.body.id));
    }

    deleteEntity = (req, res, next) => {
        baseController.deleteEntity(req, res, next,baseQuery.deleteEntity('role',req.params.id));
    }

}
const roleController = new RoleController();
module.exports = roleController;
