const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Employee Model Import
const UserModel = require('../models/userModel');
const ProjectModel = require('../models/projectModel');
const TeamModel = require('../models/teamModel');

// JWT Send Token
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { userId, username, name, email, password, avatar, role } = req.body;
    const user = await UserModel.create({
        userId: userId, username, name, email, password, role,
        avatar: {
            public_id: avatar.public_id,
            url: avatar.url
        }
    });

    if (!user) {
        res.status(400).json({ message: "user not created" });
    }

    res.status(201).json({
        success: true,
        message: `User : ${name} is created successfully`
    });
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await UserModel.findById(req.params.id);

    if (!user) return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`));

    res.status(200).json({
        success: true,
        user,
    })
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await UserModel.find();
    res.status(200).json({
        success: true,
        users
    })
});

// DELETE
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await UserModel.deleteOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "not deleted" });
    res.status(200).json({
        success: true,
        message: `User deleted successfully`
    });
});

// UPDATE
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, avatar } = req.body;
    const user = await UserModel.updateOne({ _id: userId }, { $set: { name: name, email: email, avatar: avatar } });
    if (!user) return res.status(400).json({ message: "User not updated" });
    res.status(200).json({
        success: true,
        message: "User updated successfully"
    })
});

// LOGIN
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email, !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const user = await UserModel.findOne({ email: email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
});

// LOGOUT
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'None'
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

// Get LoggedIn User Details
exports.getLoggedInUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await UserModel.findById(req.user);
    res.status(200).json({
        success: true,
        user
    });
});





// GET All Project Managers of Organisation
exports.getProjectManagersOfOrg = catchAsyncErrors(async (req, res, next) => {
    const { orgId } = req.body;
    let projectMans = await ProjectModel.find({ orgId: orgId }, { projectLead: 1, _id: 0 });
    projectMans = projectMans.map(man => man.projectLead);

    if (!projectMans.length) return next(new ErrorHandler("No project managers found", 401));
    projectMans = await UserModel.find({ _id: { $in: projectMans } });

    res.status(200).json({
        success: true,
        projectMans
    });
});

// GET All Team Leaders of Organisation
exports.getTeamLeadersOfOrg = catchAsyncErrors(async (req, res, next) => {
    const { orgId } = req.body;
    let teamLeaders = await TeamModel.find({ orgId: orgId }, { teamLeader: 1, _id: 0 });
    if (!teamLeaders.length) return next(new ErrorHandler("No Team Leader found", 401));
    teamLeaders = teamLeaders.map((lead) => lead.teamLeader);
    teamLeaders = await UserModel.find({ _id: { $in: teamLeaders } });
    if (!teamLeaders.length) return next(new ErrorHandler("No Team Leader found", 401));
    res.status(200).json({
        success: true,
        teamLeaders
    })
});

// GET All Team Members of Organisation
exports.getTeamMembersOfOrg = catchAsyncErrors(async (req, res, next) => {
    const { orgId } = req.body;
    let teamMembers = await TeamModel.find({ orgId }, { members: 1, _id: 0 });
    if (!teamMembers.length) return next(new ErrorHandler("No team members found", 401));
    let arrayTM = [];
    teamMembers.forEach(member => {
        member.members.forEach(mem => arrayTM.push(mem._id))
    });
    teamMembers = await UserModel.find({ _id: { $in: arrayTM } });
    if (!teamMembers.length) return next(new ErrorHandler("No team members found", 401));
    res.status(200).json({
        message: true,
        teamMembers
    });
});

// GET ProjectManger of Project
exports.getProjectManagerOfProject = catchAsyncErrors(async (req, res, next) => {
    const { projectId } = req.body;
    let projectMan = await ProjectModel.find({ _id: projectId }, { projectLead: 1, _id: 0 });
    if (!projectMan) return next(new ErrorHandler("No project manager", 401));
    projectMan = projectMan[0].projectLead;
    projectMan = await UserModel.find({ _id: projectMan });
    res.status(200).json({
        success: true,
        projectMan
    });
});

// GET Team Leaders of Project
exports.getTeamLeadersOfProject = catchAsyncErrors(async (req, res, next) => {
    const { projectId } = req.body;
    let teamLeaders = await TeamModel.find({ projectId }, { teamLeader: 1, _id: 0 });
    if (!teamLeaders.length) return next(new ErrorHandler("No Team Leaders found", 401));
    const teamLeadersArray = [];
    teamLeaders.forEach((lead) => teamLeadersArray.push(lead.teamLeader));
    teamLeaders = await UserModel.find({ _id: { $in: teamLeadersArray } });
    if (!teamLeaders.length) return next(new ErrorHandler("No Team Leaders found", 401));
    res.status(200).json({
        success: true,
        teamLeaders
    })
});

exports.getTeamMembersOfProject = catchAsyncErrors(async (req, res, next) => {
    const { projectId } = req.body;
    let teamMembers = await TeamModel.find({ projectId }, { members: 1, _id: 0 });
    if (!teamMembers.length) return next(new ErrorHandler("No team members found", 401));
    let arrayTM = [];
    teamMembers.forEach(member => {
        member.members.forEach(mem => arrayTM.push(mem._id))
    });
    teamMembers = await UserModel.find({ _id: { $in: arrayTM } });
    if (!teamMembers.length) return next(new ErrorHandler("No team members found", 401));
    res.status(200).json({
        message: true,
        teamMembers
    });
})

exports.getTeamLeaderOfTeam = catchAsyncErrors(async (req, res, next) => {
    const { teamId } = req.body;
    let teamLeader = await TeamModel.find({ _id: teamId }, { teamLeader: 1, _id: 0 });
    if (!teamLeader.length) return next(new ErrorHandler("No Team leader found", 401));
    teamLeader = (teamLeader[0].teamLeader);
    teamLeader = await UserModel.find({ _id: teamLeader });
    if (!teamLeader.length) return next(new ErrorHandler("No Team leader found", 401));
    res.status(200).json({
        success: true,
        teamLeader
    });
});

exports.getTeamMembersOfTeam = catchAsyncErrors(async (req, res, next) => {
    const { teamId } = req.body;
    let teamMembers = await TeamModel.find({ _id: teamId }, { members: 1, _id: 0 });
    if (!teamMembers.length) return next(new ErrorHandler("No team members found", 401));
    let arrayTM = [];
    teamMembers.forEach(member => {
        member.members.forEach(mem => arrayTM.push(mem._id))
    });
    teamMembers = await UserModel.find({ _id: { $in: arrayTM } });
    if (!teamMembers.length) return next(new ErrorHandler("No team members found", 401));
    res.status(200).json({
        message: true,
        teamMembers
    });
});




// Admin routes for All Details of Users


exports.getAllFounders = catchAsyncErrors(async (req, res, next) => {
    const founders = await UserModel.find({ role: "founder" });
    if (!founders) {
        return next(new ErrorHandler("No founders found", 401));
    }
    res.status(200).json({
        success: true,
        founders
    })
});

exports.getAllProjectManagers = catchAsyncErrors(async (req, res, next) => {
    const projectManagers = await UserModel.find({ role: "projectManager" });
    if (!projectManagers) {
        return next(new ErrorHandler("No Project managers found", 401));
    }
    res.status(200).json({
        success: true,
        projectManagers
    })
});

exports.getAllTeamLeaders = catchAsyncErrors(async (req, res, next) => {
    const teamLeaders = await UserModel.find({ role: "teamLeader" });
    if (!teamLeaders) {
        return next(new ErrorHandler("No teamLeaders found", 401));
    }
    res.status(200).json({
        success: true,
        teamLeaders
    })
});

exports.getAllTeamMembers = catchAsyncErrors(async (req, res, next) => {
    const teamMembers = await UserModel.find({ role: "teamMember" });
    if (!teamMembers) {
        return next(new ErrorHandler("No teamMember found", 401));
    }
    res.status(200).json({
        success: true,
        teamMembers
    })
})