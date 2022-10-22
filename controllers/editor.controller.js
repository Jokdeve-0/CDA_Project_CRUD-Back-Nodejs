const baseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const baseController = require('./base.controller');

class EditorController{

    selectAll = (req, res, next) => {
        baseController.selectAll(req, res, next,baseQuery.selectAll('editor'));
    }

    addEntity = (req, res, next) => {
        baseController.addEntity(req, res, next,baseQuery.addEntity('editor',req.body));
    }
    
    selectEntity = (req, res, next) => {
        baseController.selectEntity(req, res, next,baseQuery.selectEntity('editor',req.body.id));
    }

    editEntity = (req, res, next) => {
        baseController.editEntity(req, res, next,baseQuery.selectEntity('editor',req.body.id));
    }

    deleteEntity = (req, res, next) => {
        baseController.deleteEntity(req, res, next,baseQuery.deleteEntity('editor',req.params.id));
    }
}
const editorController = new EditorController();
module.exports = editorController;