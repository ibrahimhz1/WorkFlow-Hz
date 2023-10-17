const ErrorHandler = require('../middlewares/error')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Label Model Import
const LabelModel = require('../models/labelModel');
// Project Model Import
const TaskModel = require('../models/taskModel');

exports.createLabel = catchAsyncErrors(async (req, res, next) => {
    const { labelId, labelName } = req.body;
    const label = await LabelModel.create({ labelId, labelName });
    if (!label) return res.status(400).json({ message: `${labelName}Label not created` });
    res.status(200).json({
        success: true,
        label
    });
});

exports.getAllLabels = catchAsyncErrors(async (req, res, next) => {
    const labels = await LabelModel.find();
    if (!labels || !labels.length) return res.status(400).json({ message: "No labels created" });
    res.status(200).json({
        success: true,
        labels
    });
});

// Get All Labels of Specific Project
exports.getLabelsOfProject = catchAsyncErrors(async (req, res, next) => {
    const { projectId } = req.body;
    const labels = await TaskModel.find({ projectId: projectId }, { _id: 0, label: 1, 'subTask.label': 1 });
    if (!labels || !labels.length) return res.status(400).json({ message: "no labels found" });
    const resultantLabels = {
        subTaskLabels: labels[0].subTask[0].label,
        labels: labels[0].label
    }

    // creating array of labels and filtering only unique values
    
    let array = [];
    resultantLabels.subTaskLabels.forEach(element => {
        array.push(element._id.toString())
    });
    resultantLabels.labels.forEach(element => {
        array.push(element._id.toString())
    });

    function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }
    
    array = removeDuplicates(array);
    // console.log(array);
    const labelNames = [];
    async function findLabelNames(arr) {
        const promises = arr.map(async (element) => {
            const name = await LabelModel.find({_id: element}, {_id: 0, labelName: 1});
            labelNames.push(name[0].labelName)
        });
        await Promise.all(promises);
    }
    await findLabelNames(array);

    res.status(200).json({
        success: true,
        labels: labelNames
    });
});

// DELETE
exports.deleteLabel = catchAsyncErrors(async (req, res, next) => {
    const label = await LabelModel.deleteOne({ _id: req.params.id });
    if (!label) return res.status(400).json({ message: "Label not deleted" });
    res.status(200).json({
        success: true,
        message: "Label deleted successfully"
    })
});

// UPDATE
exports.updateLabel = catchAsyncErrors(async (req, res, next) => {
    const labelId = req.params.id;
    const { labelName } = req.body;
    const label = await LabelModel.updateOne({ _id: labelId }, { $set: { labelName: labelName } });
    if (!label) return res.status(400).json({ message: "Label not updated" });
    res.status(200).json({
        success: true,
        message: "Label updated successfully"
    })
});

