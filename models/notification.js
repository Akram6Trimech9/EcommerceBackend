const mongoose = require("mongoose");


const Notification = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: { type: String, required: true },
    user: {type:mongoose.Schema.Types.ObjectId,ref:'users'}
});


module.exports = mongoose.model('notifications', Notification);