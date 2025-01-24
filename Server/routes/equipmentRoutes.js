const express = require('express');
const { createEquipment,  updateEquipmentStatus, getEquipments } = require('../controllers/equipment.controller');
const router = express.Router();

router.post('/', createEquipment);
router.get('/', getEquipments);
router.put('/:id', updateEquipmentStatus);

module.exports = router;