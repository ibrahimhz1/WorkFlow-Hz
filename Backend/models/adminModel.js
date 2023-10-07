const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');



const AdminSchema = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
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
        select: false
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
        default: "admin"
    },
    cretedAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// Before Saving in Database
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

// Compare Password
AdminSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

// JWT - Token
AdminSchema.methods.getJWTToken = function () {
    return jsonWebToken.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}


module.exports = mongoose.model("Admin", AdminSchema);

