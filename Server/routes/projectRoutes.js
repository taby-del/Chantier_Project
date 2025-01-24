const express = require('express');
const {createProject, getProjects, updateProject, deleteProject,
} = require('../controllers/project.controller');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', checkRole(['admin']), createProject); 
router.get('/', getProjects); 
router.put('/:id', updateProject);
router.delete('/:id', checkRole(['admin']), deleteProject); 

module.exports = router;
