const Sanction = require('../libs/models/sanction.models');
const User = require('../libs/models/user.model');

exports.createSanction = async (req, res) => {
    const { userId, reason, amount, issuedBy } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user || (user.role !== 'worker' && user.role !== 'supervisor')) {
            return res.status(404).json({ success: false, message: 'User not found or not eligible for sanction' });
        }

        // Deduct amount from the user's salary
        if (user.salary < amount) {
            return res.status(400).json({ success: false, message: 'Sanction amount exceeds user salary' });
        }
        user.salary -= amount;
        await user.save();

        // Create and save the sanction
        const sanction = new Sanction({ user: userId, reason, amount, issuedBy });
        await sanction.save();

        res.status(201).json({ success: true, message: 'Sanction applied successfully', sanction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSanctions = async (req, res) => {
    try {
        const sanctions = await Sanction.find()
            .populate('user', 'name email role')
            .populate('issuedBy', 'name email');
        res.status(200).json({ success: true, sanctions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteSanction = async (req, res) => {
    const { id } = req.params;

    try {
        const sanction = await Sanction.findByIdAndDelete(id);
        if (!sanction) {
            return res.status(404).json({ success: false, message: 'Sanction not found' });
        }
        res.status(200).json({ success: true, message: 'Sanction deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
