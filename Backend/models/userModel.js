const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 5 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    cretedAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", UserSchema);