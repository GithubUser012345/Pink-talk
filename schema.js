const mongoose = require('mongoose');

//schema
const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        maxlength: 100,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

//model
let Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;