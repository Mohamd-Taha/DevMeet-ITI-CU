const messageModel=require('../Models/groupMessageModel');

var addgrpMsg=(req,res)=>{

    var {groupName,groupMembers,groupAdmin}=req.body;
    var {groupMessageIcon=""}=req.file.filename;
    var grpmsgmdl=new messageModel();
    grpmsgmdl.groupName=groupName;
    grpmsgmdl.groupMembers=groupMembers;
    grpmsgmdl.groupMessageIcon=groupMessageIcon;
    grpmsgmdl.save();
  

}







module.exports={addgrpMsg}
