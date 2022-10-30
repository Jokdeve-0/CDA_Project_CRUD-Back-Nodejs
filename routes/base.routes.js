const express = require('express');
const router = express.Router()
const bookController = require('../controllers/book.controller')
const editorController = require('../controllers/editor.controller')
const editorMemberController = require('../controllers/editorMember.controller')
const roleController = require('../controllers/role.controller')
const userController = require('../controllers/user.controller')
const controllers = {
    book:bookController,
    editor:editorController,
    editorMember:editorMemberController,
    role:roleController,
    user:userController,
}
const routes = (name) => {
    const baseController = controllers[name];
    console.log(baseController)
    router.get(`/${name}/all`, baseController.selectAll);
    router.post(`/${name}/add`, baseController.addEntity);
    router.post(`/${name}/show`, baseController.selectEntity);
    router.patch(`/${name}/edit`, baseController.editEntity);
    router.delete(`/${name}/delete/:id`, baseController.deleteEntity);

    return router;
}

module.exports = routes