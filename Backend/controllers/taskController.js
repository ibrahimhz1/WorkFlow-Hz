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

    if (!task) return res.status(400).json({ message: "Task not created" });
    res.status(200).json({ success: true, task });
});


// task details
exports.getTaskDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    if (!task) return res.status(400).json({ message: `No task found by this id: ${id}` });
    res.status(200).json({
        success: true,
        task
    });
});

// get all tasks of the specific project
exports.getTasksofProject = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.body;
    const tasks = await TaskModel.find({ projectId: { $eq: id } });
    if (!tasks) return res.status(400).json({ message: `No tasks found in this project id: ${id}` });
    res.status(200).json({
        success: true,
        tasks
    });
});

// Admin
exports.getAllTasks = catchAsyncErrors(async (req, res, next) => {
    const tasks = await TaskModel.find();
    if (!tasks) res.status(400).json({ message: "No task created" });
    res.status(200).json({
        success: true,
        tasks
    });
});

exports.getLabelsOfTask = catchAsyncErrors(async (req, res, next) => {
    const { taskId } = req.body;
    const labels = await TaskModel.find({ _id: taskId }, { _id: 0, label: 1 });
    if (!labels || !labels.length) return res.status(400).json({ message: "no labels" });
    res.status(200).json({
        success: true,
        labels
    });
});

exports.getSubTaskOfTask = catchAsyncErrors(async (req, res, next) => {
    const { taskId } = req.body;
    const subTasks = await TaskModel.find({ _id: taskId }, { _id: 0, subTask: 1 });
    if (!subTasks || !subTasks.length) return res.status(400).json({ message: "no subTasks" });
    res.status(200).json({
        success: true,
        subTasks: subTasks[0].subTask
    });
});

exports.getTasksCreatedByUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const tasks = await TaskModel.find({ "assignees._id": userId });
    if (!tasks) return res.status(400).json({ message: "no task CREATED by this user" });
    res.status(200).json({
        success: true,
        tasks
    });
});


exports.getTasksAssignedForUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const tasks = await TaskModel.find({ "reporters._id": userId });
    if (!tasks) return res.status(400).json({ message: "no task ASSIGNED for this user" });
    res.status(200).json({
        success: true,
        tasks
    });
});


