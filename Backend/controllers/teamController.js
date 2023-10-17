const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../middlewares/error');

const TeamModel = require('../models/teamModel');

exports.createTeam = catchAsyncErrors(async (req, res, next) => {
    const { orgId, projectId, teamId, name, description, teamLeader, members } = req.body;
    const team = await TeamModel.create({orgId, projectId, teamId, name, description, teamLeader, members });
    if (!team) return res.status(400).json({ message: "Team not created" })
    res.status(200).json({
        success: true,
        team
    });
});

exports.getAllTeams = catchAsyncErrors(async (req, res, next) => {
    const teams = await TeamModel.find();
    if (!teams) return res.status(400).json({ message: "No team found" });
    res.status(200).json({
        success: true,
        teams
    });
});

exports.deleteTeam = catchAsyncErrors(async (req, res, next) => {
    const { teamId } = req.params.id;
    const response = await TeamModel.deleteOne({ _id: teamId });
    if (!response) return res.status(400).json({ message: "team not deleted" });
    res.status(200).json({ message: "team deleted successfully" });
});

exports.updateTeam = catchAsyncErrors(async (req, res, next) => {
    const { teamId, name, description, teamLeader, members } = req.body;
    const team = await TeamModel.updateOne({ _id: teamId }, { $set: { name, description, teamLeader, members } });
    if (!team) return res.status(400).json({ message: "Team not updated" })
    res.status(200).json({
        success: true,
        message: "Team updated successfully"
    });
});

exports.getTeamsOfProject = catchAsyncErrors(async (req, res, next) => {
    const { projectId } = req.body;
    const teams = await TeamModel.find({projectId})
    if(!teams) return res.status(400).json({message: "no teams found in this project"})
    res.status(200).json({
        success: true,
        teams
    })
});

