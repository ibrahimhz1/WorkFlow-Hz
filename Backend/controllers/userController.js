const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


// Employee Model Import
const UserModel = require('../models/userModel');


exports.registerUser = catchAsyncErrors(async(req, res, next)=> {
    const {name, email, password, avatar} = req.body;
    const user = await UserModel.create({
        name, email, password,
        avatar: {
            public_id: avatar.public_id, 
            url: avatar.url
        }
    })

    if(!user){
        res.status(400).json({message: "user not created"});
    }

    res.status(201).json({success: true, 
        message: `User : ${name} is created successfully`
    });

});

exports.getUserDetails = catchAsyncErrors(async(req, res, next)=> {
    const user = await UserModel.findById(req.params.id);
    
    if(!user) return next(new ErrorHandler(`User does not exist with id : ${req.params.id}`));

    res.status(200).json({
        success: true,
        user,
    })
});

exports.getAllUsers = catchAsyncErrors(async(req, res, next)=> {
    const users = await UserModel.find();
    res.status(200).json({
        success: true,
        users
    })
});

// DELETE
exports.deleteUser = catchAsyncErrors(async(req, res, next)=> {
    const user = await UserModel.deleteOne({_id : req.params.id});
    if(!user) return res.status(400).json({message: "not deleted"});
    res.status(200).json({
        success: true,
        message: `User deleted successfully`
    });
});

// UPDATE
exports.updateUser = catchAsyncErrors(async(req, res, next)=> {
    const userId = req.params.id;
    const { name, email, avatar } = req.body; 
    const user = await UserModel.updateOne({_id : userId}, {$set: {name: name, email: email, avatar: avatar}});
    if(!user) return res.status(400).json({message: "User not updated"});
    res.status(200).json({
        success: true,
        message: "User updated successfully"
    })
});