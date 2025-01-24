const Equipment = require('../libs/models/equipment.model');

exports.createEquipment = async (req, res) => {
    const { name, type, addedBy } = req.body;

    try {
        const equipment = new Equipment({ name, type, addedBy });
        await equipment.save();
        res.status(201).json({ success: true, message: 'Equipment created successfully', equipment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getEquipments = async (req, res) => {
    try {
        const equipments = await Equipment.find().populate('assignedTo').populate('projectId');
        res.status(200).json({ success: true, equipments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateEquipmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status, assignedTo, projectId } = req.body;

    try {
        const equipment = await Equipment.findByIdAndUpdate(id, { status, assignedTo, projectId }, { new: true });
        if (!equipment) {
            return res.status(404).json({ success: false, message: 'Equipment not found' });
        }
        res.status(200).json({ success: true, message: 'Equipment updated successfully', equipment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
