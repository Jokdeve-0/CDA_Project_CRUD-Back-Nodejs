const express = require('express');
const router = express.Router()
const roleController = require('../controllers/role.controller')

router.get('/all', roleController.selectAll);
router.post('/add', roleController.addEntity);
router.post('/show', roleController.selectEntity);
router.patch('/edit', roleController.editEntity);
router.delete('/delete/:id', roleController.deleteEntity);

module.exports = router