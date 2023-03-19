const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    id: mongoose.Types.ObjectId,
    user: {
      firstName: String,
      lastName: String,
      profilePicture: String,
      id: mongoose.Types.ObjectId,
    },
    recipients: [
      { id: { type: mongoose.SchemaTypes.ObjectId }, isRead: Boolean },
    ],
    url: String,
    text: String,
    content: String,
    image: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notifications", notificationSchema);
