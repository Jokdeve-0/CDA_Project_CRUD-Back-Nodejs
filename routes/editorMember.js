const express = require('express');
const router = express.Router()
const editorMemberController = require('../controllers/editorMember.controller')

router.get('/all', editorMemberController.selectAll);
router.post('/add', editorMemberController.addEntity);
router.post('/show', editorMemberController.selectEntity);
router.patch('/edit', editorMemberController.editEntity);
router.delete('/delete/:id', editorMemberController.deleteEntity);

module.exports = router