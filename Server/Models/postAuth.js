const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, { useNewUrlParser: true });

var postsSchema = new mongoose.Schema({

  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userPicturePath: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  picturePath: {
    type: String,
    default: "",
  },
  
  likes: {
    type: Number,
  },

  comments: {
    type: [mongoose.SchemaTypes.ObjectId],
    default: [],
  },
  
  helpful: {
    type: Map,
    of: Boolean,
  },
  wow: {
    type: Map,
    of: Boolean,
  },

  tags: {
    type: [String]
  },


},
  { timestamps: true }

)

module.exports = mongoose.model("posts", postsSchema);