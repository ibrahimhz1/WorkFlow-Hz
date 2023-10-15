const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');
const AdminModel = require('../models/adminModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resources", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    // console.log( "decoded data" , decodedData);
    req.user = await UserModel.findById(decodedData.id) || await AdminModel.findById(decodedData.id);
    // console.log(req.user);
    next();
});

exports.authorizedRoles = (...roles)=> {
    return (req, res, next)=> {
        // console.log("Role", req.user.role);
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resources`, 403));
        }
        next();
    }
}
