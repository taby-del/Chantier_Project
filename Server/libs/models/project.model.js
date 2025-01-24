const mongoose =  require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Project name is required'],
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
    },
    StartDate: {
        type: Date,
        required: [true, 'Project start date is required'],
    },
    EndDate: {
        type: Date,
        required: [true, 'Project end date is required'],
    },
    status: {
        type: String,
        enum: ['ongoing', 'completed'],
        default: 'ongoing',
    },
    assinedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', ProjectSchema);