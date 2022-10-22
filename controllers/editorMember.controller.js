const baseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const baseController = require('./base.controller');

class EditorMemberController{

    selectAll = (req, res, next) => {
        baseController.selectAll(req, res, next,baseQuery.selectAll('editor_member'));
    }
    
    addEntity = (req, res, next) => {
        baseController.addEntity(req, res, next,baseQuery.addEntity('editor_member',req.body));
    }
    
    selectEntity = (req, res, next) => {
        baseController.selectEntity(req, res, next,baseQuery.selectEntity('editor_member',req.body.id));
    }

    editEntity = (req, res, next) => {
        baseController.editEntity(req, res, next,baseQuery.selectEntity('editor_member',req.body.id));
    }

    deleteEntity = (req, res, next) => {
        baseController.deleteEntity(req, res, next,baseQuery.deleteEntity('editor_member',req.params.id));
    }

}
const editorMemberController = new EditorMemberController();
module.exports = editorMemberController;
