const baseQuery = require('../src/scripts/SQL_QUERY/BaseQuery.js');
const baseController = require('./base.controller');

class BookController{

    selectAll = (req, res, next) => {
        baseController.selectAll(req, res, next,baseQuery.selectAll('book'));
    }

    addEntity = (req, res, next) => {
        console.log(req.body)
        baseController.addEntity(req, res, next,baseQuery.addEntity('book',req.body));
    }
    
    selectEntity = (req, res, next) => {
        baseController.selectEntity(req, res, next,baseQuery.selectEntity('book',req.body.id));
    }

    editEntity = (req, res, next) => {
        baseController.editEntity(req, res, next,baseQuery.editEntity('book',req.body));
    }

    deleteEntity = (req, res, next) => {
        baseController.deleteEntity(req, res, next,baseQuery.deleteEntity('book',req.params.id));
    }

}
const bookController = new BookController();
module.exports = bookController;