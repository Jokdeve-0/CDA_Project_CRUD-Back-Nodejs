const express = require('express');
const router = express.Router()
const userController = require('../controllers/user.controller');

router.get('/all', userController.selectAll);
router.post('/add',userController.addEntity);
router.post('/show', userController.selectEntity);
router.patch('/edit', userController.editEntity);
router.delete('/delete/:id', userController.deleteEntity);

module.exports = router