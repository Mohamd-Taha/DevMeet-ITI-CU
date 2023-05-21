const mongoose = require("mongoose");

// const DB_URL = "mongodb://localhost:27017/DevMeet"
// mongoose.connect('mongodb://127.0.0.1:27017/DevMeet');

var communitySchema = new mongoose.Schema({

    communityName:
    {
        type: String,
        Required: true,
        minLength: 5,
        maxLength: 30
    },
    communityTopic:{
        type:String
    },

    communityAdmin:
    {
        adminId: {type:mongoose.SchemaTypes.ObjectId , ref: "users"},
        //in mongodb validation file i nelgect to store fName,lName,pic so i will igonre them here too
        adminName: String
    },
// communityAdmin:
//     {
//                 type:mongoose.SchemaTypes.ObjectId,
//                 Required:true,       
//                 ref:'users'
//             }
    
    communityDescription: {
        type: String,
        Required: true,
        minLength: 10,
        maxLength: 300

    },

    commiunityIcon: {
        type: String
        ,default: "GeneralCommunityIcon-DevMETT.png"

    },
    commiunityCover: {
        type: String
        ,default: "GeneralCommunityCover-DevMETT.png"

    },
    registeredUsers:
        { type: [mongoose.SchemaTypes.ObjectId], ref: "users" }
    ,
    registeredNumber: { type: Number,default:1 },

    meetups:
        {type: [mongoose.SchemaTypes.ObjectId],ref:"meetups"},
    
    posts:
     [{ type:  mongoose.SchemaTypes.ObjectId, ref: 'posts' }],
    

    joinRequests:
        { type: [mongoose.SchemaTypes.ObjectId], ref: "users" }

},{timestamps:true})

module.exports = mongoose.model("communities", communitySchema);