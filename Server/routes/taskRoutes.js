const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const router = express.Router();

router.post('/create', createTask); 
router.get('/',getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
