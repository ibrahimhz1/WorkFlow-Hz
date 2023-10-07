const mongoose = require('mongoose')

const OrganisationSchema = new mongoose.Schema({
    orgId: {
        type: String,
        required: [true, "Please enter org Id"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    description: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    department: {
        type: String,
        required: true,
    },
    founder: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model('Organisation', OrganisationSchema);