const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    orgId: {
        type: mongoose.Schema.ObjectId,
        ref: "Organisation",
        required: true,
    },
    projectId: {
        type: String,
        required:  [true, "Please Enter Project ID"],
    },
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Description"],
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
    },
    projectLead: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Project', ProjectSchema);