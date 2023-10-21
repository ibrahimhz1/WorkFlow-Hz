const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    orgId: {
        type: mongoose.Schema.ObjectId,
        ref: "Organisation",
        required: true,
    },
    projectId: {
        type: String,
        required: [true, "Please Enter Project ID"],
        unique: true
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
    },
    members: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            }
        }
    ],
    labels: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: "Label"
            }
        }
    ]
});

module.exports = mongoose.model('Project', ProjectSchema);