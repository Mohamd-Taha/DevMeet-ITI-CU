const messageModel=require('../Models/messageModel');
const groupMessageModel=require('../Models/groupMessageModel');

//i want it to add id of this message to groupMessages list at the same time
var addMessage=async (req,res)=>{
    var{content,senderID:usrid}=req.body;
    var groupMessageId=req.body.groupMessageId;
    var media=req.file.filename;
    var msgModel=new messageModel();
    msgModel.content=content;
    //i don't know how to send senderID through httpRequest in real i can't send any objectId in my Mongoose schema
    msgModel.senderID="6400a0f5e585c2d755565b81";
    msgModel.media=media;
    
    //console.log(msgModel);
   var x=await msgModel.save();

//    groupMessageModel.findById(groupMessageId).messages.push(x._id);
//       console.log(groupMessageModel.find({_id:"6400bcbadd46cac870fb1708"}).messages );
//    console.log(`x= ${x}`);
   res.send("done")
   
}








module.exports={addMessage}