const mongoose = require('mongoose');

const SanctionSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: [true, 'Reason is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amountDeducted: {
        type: Number,
        required: [true, 'Deduction amount is required'],
        min: 0
    }
});

SanctionSchema.post('save', async function () {
    const User = mongoose.model('User');
    const worker = await User.findById(this.worker);
    if (worker && (worker.role === 'supervisor' || worker.role === 'worker')) {
        worker.salary = Math.max(0, worker.salary - this.amountDeducted);
        await worker.save();
    }
});

module.exports = mongoose.model('Sanction', SanctionSchema);