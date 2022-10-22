const express = require('express')
const router = express.Router()
const databaseController = require('../controllers/database.controller')

router.get('/create', databaseController.createDatabase);
router.get('/addFixtures', databaseController.addFixtures);
router.get('/clear', databaseController.removeAllDatas);
router.get('/tables', databaseController.showTables);
router.get('/delete', databaseController.deleteDatabase);

module.exports = router