const Project = require('../libs/models/project.model');

exports.createProject = async (req, res) => {
    const { name, description, startDate, endDate, createdBy, assignedTo } = req.body;

    try {
        const project = new Project({ name, description, startDate, endDate, createdBy, assignedTo });
        await project.save();
        res.status(201).json({ success: true, message: 'Project created successfully', project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('createdBy', 'name email')
            .populate('assignedTo', 'name email role');
        res.status(200).json({ success: true, projects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description, startDate, endDate, assignedTo } = req.body;

    try {
        const project = await Project.findByIdAndUpdate(
            id,
            { name, description, startDate, endDate, assignedTo },
            { new: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project updated successfully', project });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
