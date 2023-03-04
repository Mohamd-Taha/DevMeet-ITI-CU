const mongoose = require("mongoose");

// const DB_URL = "mongodb://localhost:27017/DevMeet"
mongoose.connect('mongodb://127.0.0.1:27017/DevMeet');
var communitySchema = new mongoose.Schema({

    communityName:
    {
        type: String,
        Required: true,
        minLength: 5,
        maxLength: 20
    },


    communityAdmin:

    {
        adminId: {type:mongoose.SchemaTypes.ObjectId , ref: "DevMeetUsers"},
        //in mongodb validation file i nelgect to store fName,lName,pic so i will igonre them here too
        AdminName: String,
        AdminPic: String
    }

    // {
    //             type:mongoose.SchemaTypes.ObjectId,
    //             Required:true,       
    //             ref:'DevMeetUsers'
    //         }
    ,



    createdAt: {
        type: Date,
        default: () => new Date()
    },

    communityDescription: {
        type: String,
        Required: true,
        minLength: 10
    },

    commiunityIcon: {
        type: String,
        default: () => ""

    },

    registeredusers:
        { type: [mongoose.SchemaTypes.ObjectId], ref: "DevMeetUsers" }
    ,
    registeredNumber: { type: Number },

    meetups:
        {type: [mongoose.SchemaTypes.ObjectId],ref:"meetups"},
    
    post: 
    {type: [mongoose.SchemaTypes.ObjectId],ref:"posts"},


    joinRequests:
        { type: [mongoose.SchemaTypes.ObjectId], ref: "DevMeetUsers" }






})

module.exports = mongoose.model("communities", communitySchema);