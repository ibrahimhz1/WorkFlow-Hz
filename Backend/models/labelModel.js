const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
    labelName: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Label', LabelSchema);