const ErrorHandler = require('../middlewares/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const TaskModel = require('../models/taskModel');

exports.createTask = catchAsyncErrors(async (req, res, next) => {
    const {
        projectId,
        taskName,
        description,
        subTask,
        assignees,
        reporters,
        label

    } = req.body;

    const task = await TaskModel.create({
        projectId,
        taskName,
        description,
        subTask,
        assignees,
        reporters,
        label
    });

    if(!task) res.status(400).json({message: "Task not created"});
    res.status(200).json({success: true, task});
});


// Admin
exports.getAllTasks = catchAsyncErrors(async(req, res, next)=> {
    const tasks = await TaskModel.find();
    if(!tasks) res.status(400).json({message: "No task created"});
    res.status(200).json({
        success: true,
        tasks
    });
});


