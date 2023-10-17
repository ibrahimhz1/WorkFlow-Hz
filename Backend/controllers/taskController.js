const ErrorHandler = require('../middlewares/error');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const TaskModel = require('../models/taskModel');
const UserModel = require('../models/userModel');


exports.createTask = catchAsyncErrors(async (req, res, next) => {
    const {
        orgId,
        projectId,
        teamId,
        taskId,
        taskName,
        description,
        subTask,
        assignees,
        reporters,
        label

    } = req.body;

    const task = await TaskModel.create({
        orgId,
        projectId,
        teamId,
        taskId,
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


exports.getAllUsersOfTask = catchAsyncErrors(async (req, res, next) => {
    const { taskId } = req.body;
    const users = await TaskModel.find({ _id: taskId }, { _id: 0, assignees: 1, reporters: 1, 'subTask.assignees': 1, 'subTask.reporters': 1 });
    if (!users) return res.status(400).json({ message: "No users in this task" });
    const resultantUsers = {
        subTaskUsers: users[0].subTask,
        assignees: users[0].assignees,
        reporters: users[0].reporters
    }
    let array = [];
    resultantUsers.assignees.forEach((element) => {
        array.push(element._id.toString())
    });
    resultantUsers.reporters.forEach((element) => {
        array.push(element._id.toString())
    });
    resultantUsers.subTaskUsers.forEach((element) => {
        element.assignees.forEach((elem) => {
            array.push(elem._id.toString())
        });
        element.reporters.forEach((elem) => {
            array.push(elem._id.toString())
        })
    })

    function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }
    array = removeDuplicates(array);

    const UserNames = [];
    async function getUserNames(arr) {
        const promises = arr.map(async (element) => {
            const user = await UserModel.find({ _id: element });
            UserNames.push(user[0]);
        });
        await Promise.all(promises);
    }
    await getUserNames(array);

    res.status(200).json({
        success: true,
        users: UserNames
    });
});


// DELETE
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
    const task = await TaskModel.deleteOne({ _id: req.params.id });
    if (!task) return res.status(400).json({ message: "Task not deleted" });
    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    })
});


// UPDATE
exports.updateTask = catchAsyncErrors(async (req, res, next) => {
    const taskId = req.params.id;
    const { taskName, description, subTask, assignees, reporters, label } = req.body;
    const task = await TaskModel.updateOne({ _id: taskId }, { $set: { taskName: taskName, description: description, subTask: subTask, assignees: assignees, reporters: reporters, completed: completed, label: label } });
    if (!task) return res.status(400).json({ message: "Task not updated" });
    res.status(200).json({
        success: true,
        message: "Task updated successfully"
    })
});


exports.getAllTasksOfOrganisation = catchAsyncErrors(async (req, res, next) => {
    const { orgId } = req.body;
    const tasks = await TaskModel.find({orgId: orgId});
    if(!tasks) return res.status(400).json({message: "No tasks found"});
    res.status(200).json({
        success: true,
        tasks
    })
})

// get all tasks of the specific project
exports.getAllTasksOfProject = catchAsyncErrors(async (req, res, next) => {
    const { projectId } = req.body;
    const tasks = await TaskModel.find({projectId: projectId});
    if(!tasks) return res.status(400).json({message: "No tasks found"});
    res.status(200).json({
        success: true,
        tasks
    })
})

exports.getAllTasksOfTeam = catchAsyncErrors(async (req, res, next) => {
    const { teamId } = req.body;
    const tasks = await TaskModel.find({teamId: teamId});
    if(!tasks) return res.status(400).json({message: "No tasks found"});
    res.status(200).json({
        success: true,
        tasks
    })
})

