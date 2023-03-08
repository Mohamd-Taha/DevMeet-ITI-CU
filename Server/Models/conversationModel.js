const mongoose = require("mongoose");

// const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"
// mongoose.connect(DB_URL, { useNewUrlParser: true });
// mongoose.set('strictQuery', false);

//conversation on emy
var groupMessageSchema = mongoose.Schema(
    {
        groupName: { type: String, minLength: 5, MaxLength: 20,required:true },
        // i want to make validation on the no. of elements  on the gorupMembers array but how??
        groupMembers: { type: [mongoose.SchemaTypes.ObjectId]  },
        groupMessageIcon: { type: String },
        groupAdmin: {
            userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'DevMeetUsers' },
            fname: { type: String },
            Lname: { type: String },
            profilePicture: { type: String }

            /*
            userId:new mongoose.Schema({ userId: {type:mongoose.SchemaTypes.ObjectId, ref: 'DevMeetUsers' }}),
            fname: String,
            Lname: String,
            profilePicture:String
            */
        },

        messages: { type: [mongoose.SchemaTypes.ObjectId] }
    })


module.exports = mongoose.model("groupMessages", groupMessageSchema);