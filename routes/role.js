const express = require('express');
const router = express.Router()
const roleController = require('../controllers/role.controller')
const auth = require('../middleware/auth')

router.get('/all', roleController.selectAll);
router.post('/add',auth, roleController.addEntity);
router.post('/show',auth, roleController.selectEntity);
router.patch('/edit',auth,roleController.editEntity);
router.delete('/delete/:id',auth, roleController.deleteEntity);

module.exports = router