const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Employee Model Import
const UserModel = require('../models/userModel');

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
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
})

// Get LoggedIn User Details
exports.getLoggedInUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await UserModel.findById(req.user) ;
    res.status(200).json({
        success: true,
        user
    });
});
