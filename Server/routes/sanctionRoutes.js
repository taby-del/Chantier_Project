const express = require('express');
const {
    createSanction,
    getSanctions,
    deleteSanction,
} = require('../controllers/sanction.controller');
const { checkRole } = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', checkRole(['admin', 'supervisor']), createSanction); // Admins and Supervisors can issue sanctions
router.get('/', checkRole(['admin', 'supervisor']), getSanctions); // Get all sanctions
router.delete('/:id', checkRole(['admin']), deleteSanction); // Only Admins can delete sanctions

module.exports = router;
