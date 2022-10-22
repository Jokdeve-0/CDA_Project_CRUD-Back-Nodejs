const express = require('express')
const router = express.Router()
const editorController = require('../controllers/editor.controller')

router.get('/all', editorController.selectAll);
router.post('/add', editorController.addEntity);
router.post('/show', editorController.selectEntity);
router.patch('/edit', editorController.editEntity);
router.delete('/delete/:id', editorController.deleteEntity);

module.exports = router