const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: true
    },
    taskName: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Description"],
    },
    subTask: [
        {
            subTaskName: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: [true, "Please Enter Description"],
            },
            assignees: [
                {
                    _id: {
                        type: mongoose.Schema.ObjectId,
                        ref: "User",
                        required: true
                    }
                }
            ],
            reporters: [
                {
                    _id: {
                        type: mongoose.Schema.ObjectId,
                        ref: "User",
                        required: true
                    }
                }
            ],
            completed: {
                type: Boolean,
                default: false
            },
            label: [
                {
                    labelName: {
                        type: String
                    }
                }
            ],
            createDate: {
                type: Date,
                default: Date.now
            },
            dueDate: {
                type: Date
            }
        }
    ],
    assignees: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            }
        }
    ],
    reporters: [
        {
            _id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            }
        }
    ],
    completed: {
        type: Boolean,
        default: false
    },
    label: [
        {
            labelName: {
                type: String
            }
        }
    ],
    createDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    }
});

module.exports = mongoose.model('Task', TaskSchema);
