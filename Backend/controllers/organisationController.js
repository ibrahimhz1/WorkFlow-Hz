const ErrorHandler = require('../middlewares/error');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Organisation Model Import
const OrgModel = require('../models/organisationModel');
const ProjectModel = require('../models/projectModel');
const TaskModel = require('../models/taskModel');
const UserModel = require('../models/userModel');
const AdminModel = require('../models/adminModel');

exports.createOrg = catchAsyncErrors(async (req, res, next) => {
    const allowedRolesList = ["admin", "founder"];
    const { orgId, name, description, department } = req.body;

    const founderId = req.user;

    // check for the founderId in database
    const founderDocumentId = await AdminModel.find({ _id: founderId }, { _id: 1, role: 1 });
    if(!founderDocumentId.length){
        founderDocumentId = await UserModel.find({ _id: founderId }, { _id: 1, role: 1 });
    }

    if (allowedRolesList.includes(founderDocumentId[0].role)) {
        const org = await OrgModel.create({ orgId, name, description, department, founder: founderId._id });
        console.log('created');
        if (!org) return res.status(400).json({ message: "No organisation created" });
        res.status(200).json({
            success: true,
            org
        })
    } else {
        res.status(400).json({ message: "This user cant access this resource" });
    }
});

exports.getOrgsOfFounder = catchAsyncErrors(async (req, res, next) => {
    const allowedRolesList = ["admin", "founder"];
    const { founderId } = req.body;
    const orgs = await OrgModel.find({ founder: founderId });
    if (!orgs) return res.status(400).json({ message: "No organisation found for this founder" });
    res.status(200).json({
        success: true,
        orgs
    })
});

exports.getAllOrg = catchAsyncErrors(async (req, res, next) => {
    const allowedRolesList = ["admin", "founder", "projectManager", "teamLeader", "teamMember"];
    const founderId = req.user;
    // check for the founderId in database
    const founderDocumentId = await UserModel.find({ _id: founderId }, { _id: 1, role: 1 });
    if (allowedRolesList.includes(founderDocumentId[0].role)) {
        const orgs = await OrgModel.find();
        if (!orgs || !orgs.length) return res.status(400).json({ message: "No organisation" });
        res.status(200).json({
            success: true,
            orgs
        })
    } else {
        res.status(400).json({ message: "This user cant access this resource" });
    }
});

exports.deleteOrg = catchAsyncErrors(async (req, res, next) => {
    const allowedRolesList = ["admin", "founder"];
    const { orgId } = req.body;
    const founderId = req.user;
    // check for the founderId in database
    const founderDocumentId = await UserModel.find({ _id: founderId }, { _id: 1, role: 1 });
    if (allowedRolesList.includes(founderDocumentId[0].role)) {
        const org = await OrgModel.deleteOne({ orgId: orgId });
        if (!org) return res.status(400).json({ message: "No organisation deleted" });
        res.status(200).json({
            success: true,
            message: "Organisation deleted successfuly"
        })
    } else {
        res.status(400).json({ message: "This user cant access this resource" });
    }
});

exports.updateOrg = catchAsyncErrors(async (req, res, next) => {
    const allowedRolesList = ["admin", "founder"];
    const { orgId, name, description, department } = req.body;
    const founderId = req.user;
    const founderDocumentId = await UserModel.find({ _id: founderId }, { _id: 1, role: 1 });
    if (allowedRolesList.includes(founderDocumentId[0].role)) {
        const org = await OrgModel.updateOne({ orgId }, { $set: { name: name, description: description, department: department } });
        if (!org) res.status(400).json({ message: "organanisation not updated" });
        res.status(200).json({
            success: true,
            message: "updated successfully"
        })
    }
    else {
        res.status(400).json({ message: "This user cant access this resource" });
    }
});
