const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"

mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, {useNewUrlParser:true});

var postsSchema = new mongoose.Schema({
 userId: {
      type: String,
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
    description: {
     type:String,
     default:"",
    },
     picturePath: {
     type:String,
     default:"",
    },
     userPicturePath: {
     type:String,
     default:"",
    },
   likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
},
{timestamps:true}
)

mongoose.exports = mongoose.model("DevMeetPosts", postSchema);