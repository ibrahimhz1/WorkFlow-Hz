const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resources", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decodedData.id);
    next();
});