const router=require("express").Router();
const Conversation=require("../Models/Conversation");
router.post("/", async (req, res) => {
   
  
      const foundConversation =  await Conversation.findOne({members: { $all:[req.body.senderId, req.body.receiverId]}})
      console.log(foundConversation)
      if(foundConversation!=null){
      await foundConversation.deleteOne();
      }
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
      });
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } 
);
  router.get("/:userId",async(req,res)=>{
    try{
const conversation =await Conversation.find({
    members:{$in:[req.params.userId]}
});
res.status(200).json(conversation);
    }catch (err) {
      res.status(500).json(err);
    }
  })





module.exports=router;