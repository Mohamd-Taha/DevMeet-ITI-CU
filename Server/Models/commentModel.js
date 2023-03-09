const mongoose = require("mongoose");

// const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"
// mongoose.connect(DB_URL, { useNewUrlParser: true });

/*
var commentSchema= mongoose.Schema({
    content:{type:String , required:true},
    postId:{type:int,required:True},
    userId:{type:int,required:true},
    firstname:{type:String},
    lastname:{type:String},
    userPic:{type:String},
    image:{type:String }


},
{timestamps:true}
)

 */



var commentSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userPicturePath: {
        type: String,
    },
    picturePath: {
        type: String,
    },



    

},
    { timestamps: true }
)
module.exports = mongoose.model("comments", commentSchema);

