const express = require('express');
const router = express.Router();
const config = require('../src/_config/config');
const auth = require('../middleware/auth');
const baseController = require('../controllers/base.controller');
const bookController = require('../controllers/book.controller');
const databaseController = require('../controllers/database.controller');
const editorController = require('../controllers/editor.controller');
const editorMemberController = require('../controllers/editorMember.controller');
const roleController = require('../controllers/role.controller');
const userController = require('../controllers/user.controller');
const csrfCheck = require('../middleware/csrf');
const { csrfRoutes } = require('./csrf.routes');
// -end import
const controllers = {
    auth:baseController,
    book:bookController,
    database:databaseController,
    editor:editorController,
    editorMember:editorMemberController,
    role:roleController,
    user:userController,
}
// set headers
router.use((request, response, next) => {
    response
    .header('Access-Control-Allow-Credentials', 'true')
    .header('Access-Control-Allow-Origin', config.origins)
    .header('Access-Control-Allow-Headers', config.allowHeaders.join(', '))
    .header('Access-Control-Expose-Headers', config.exposeHeaders.join(', '))
    .header('Access-Control-Allow-Methods', config.allowMethods.join(', '));
  next();
});
// check csrf
router.use(csrfCheck);
// config router
const routes = (name) => {
    // get token csrf
    if(name==='csrfToken'){
      csrfRoutes(router);
    }else if(name === 'auth'){
      router.post(`/${name}/signup`,baseController.signup);
      router.post(`/${name}/login`,baseController.login);
      router.get(`/${name}/logout`, baseController.logout);

    }else if(name === 'database'){
      // not auth
      router.get(`/${name}/create/tables`, databaseController.createTables);
      router.post(`/${name}/add/entities`, databaseController.addFixtures);
      router.post(`/${name}/delete/entities`, databaseController.removeAllDatas);
      router.patch(`/${name}/show/tables`, databaseController.showTables);
      router.delete(`/${name}/delete/tables`,databaseController.deleteTables);

    }
    else{
        const matchingController = controllers[name !== '' ? name : 'book'];
        router.get(`/${name}/all`,matchingController.selectAll);
        // auth
        router.post(`/${name}/add`,auth, matchingController.addEntity);
        router.post(`/${name}/show`,auth, matchingController.selectEntity);
        router.patch(`/${name}/edit`,auth,matchingController.editEntity);
        router.delete(`/${name}/delete/:id`,auth, matchingController.deleteEntity);
    }
    return router;
}

module.exports = routes