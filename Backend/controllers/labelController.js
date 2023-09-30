const ErrorHandler = require('../middlewares/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Project Model Import
const LabelModel = require('../models/labelModel');

exports.createLabel = catchAsyncErrors(async (req, res, next) => {
    const { labelName } = req.body;
    const label = await LabelModel.create({ labelName });
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
