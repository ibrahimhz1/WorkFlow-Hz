const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
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
                    name: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true
                }
            ],
            reporters: [
                {
                    name: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true
                }
            ],
            completed: {
                type: Boolean,
                required: true
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
            name: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    ],
    reporters: [
        {
            name: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    ],
    completed: {
        type: Boolean,
        required: true
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
