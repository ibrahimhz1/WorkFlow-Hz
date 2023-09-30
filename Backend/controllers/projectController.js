const ErrorHandler = require('../middlewares/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Project Model Import
const ProjectModel = require('../models/projectModel');

exports.createProject = catchAsyncErrors(async (req, res, next) => {
    const { name, description, category, projectLead } = req.body;
    const project = await ProjectModel.create({
        name,
        description,
        category,
        projectLead
    });

    if (!project) {
        res.status(400).json({ message: 'project not created' })
    }

    res.status(200).json({
        success: true,
        project
    })
});

exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {
    const projectId = req.params.id;
    const project = await ProjectModel.findById(projectId);
    if (!project) return next(new ErrorHandler(`Project not found`));
    res.status(200).json({
        success: true,
        project
    })
});

exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
    const projects = await ProjectModel.find();
    if (!projects) {
        return res.status(400).json({ message: "no projects found" });
    }
    res.status(200).json({
        success: true,
        projects
    });
});


exports.getProjectsOfUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const projects = await ProjectModel.find({ 'projectLead': { $eq: userId } });
    if (!projects || !projects.length) return res.status(400).json({ message: "this user has no projects" })
    res.status(200).json({
        success: true,
        projects
    });
});

// DELETE
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
    const project = await ProjectModel.deleteOne({ _id: req.params.id });
    if (!project) return res.status(400).json({ message: "Project Not deleted" });
    res.status(200).json({
        success: true,
        message: "Project deleted successfully"
    })
});

// UPDATE
exports.updateProject = catchAsyncErrors(async (req, res, next) => {
    const projectId = req.params.id;
    const {name, description, category } = req.body;
    const project = await ProjectModel.updateOne({_id : projectId}, {$set: {name: name, description: description, category: category}});
    if(!project) return res.status(400).json({message: "Project not updated"});
    res.status(200).json({
        success: true,
        message: "Project updated successfully"
    })
});

