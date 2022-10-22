const express = require('express');
const router = express.Router()
const bookController = require('../controllers/book.controller')

router.get('/all', bookController.selectAll);
router.post('/add', bookController.addEntity);
router.post('/show', bookController.selectEntity);
router.patch('/edit', bookController.editEntity);
router.delete('/delete/:id', bookController.deleteEntity);

module.exports = router