const conversationModel=require('../Models/conversationModel');


//new conv
var newConversation= async (req, res) => {
    const newConversation = new conversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }

//get convsersations of a user
  var getConversationByUsrId=async (req, res) => {
    try {
      const conversation = await conversationModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // get conv includes two userId
  var getOneToOneConv=async (req, res) => {
    try {
      const conversation = await conversationModel.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  }
  

/**
var addgrpMsg=(req,res)=>{

    var {groupName,groupMembers,groupAdmin}=req.body;
    var {groupMessageIcon=""}=req.file.filename;
    var grpmsgmdl=new messageModel();
    grpmsgmdl.groupName=groupName;
    grpmsgmdl.groupMembers=groupMembers;
    grpmsgmdl.groupMessageIcon=groupMessageIcon;
    grpmsgmdl.save();
  

}

 */

module.exports={newConversation,getConversationByUsrId,getOneToOneConv}
