const mongoose = require("mongoose");

// const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"
// mongoose.set('strictQuery', false);
// mongoose.connect(DB_URL, { useNewUrlParser: true });

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
    required: true
  },
  userPicturePath: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true
  },
  picturePath: {
    type: String,
    default: "",
  },
  
  likes: {
    type: Map,
    of: Boolean
  },

  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  personalCheck:{
    type:Boolean
    //,default:true

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