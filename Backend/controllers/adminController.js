const ErrorHandler = require('../middlewares/error');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const AdminModel = require('../models/adminModel');

// JWT Send Token
const sendToken = require('../utils/jwtToken');

exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
    const { adminId, name, username, email, password, avatar, role } = req.body;

    const admin = await AdminModel.create({
        adminId, name, username, email, password, role,
        avatar: {
            public_id: avatar.public_id,
            url: avatar.url
        }
    });

    if (!admin) {
        res.status(400).json({ message: "admin not created" });
    }

    res.status(201).json({
        success: true,
        message: `Admin : ${name} is created successfully`
    });
});

exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email, !password) {
        return next(new ErrorHandler("Please Enter Email and Password", 400));
    }

    const admin = await AdminModel.findOne({ email: email }).select("+password");

    if (!admin) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await admin.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    sendToken(admin, 200, res);
});

exports.getLoggedInAdminProfile = catchAsyncErrors(async (req, res, next) => {
    const admin = await AdminModel.findById(req.user);
    res.status(200).json({
        success: true,
        admin
    });
});
