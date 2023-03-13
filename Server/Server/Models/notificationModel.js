const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    user: {type: mongoose.Types.ObjectId, ref: 'users'},
    // recipients: [mongoose.Types.ObjectId],
    recipients: [{id:{type:mongoose.SchemaTypes.ObjectId},isRead:Boolean}],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: {type: Boolean, default: false}
}, {
    timestamps: true
})

module.exports = mongoose.model('notification', notificationSchema)