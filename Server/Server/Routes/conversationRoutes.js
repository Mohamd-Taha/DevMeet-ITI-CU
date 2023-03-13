const router = require("express").Router();

const conversationController=require('../Controllers/conversationController')

// const Conversation = require("../models/Conversation");

//new conv
router.post("/",conversationController.newConversation);

//get conv of a user
router.get("/:userId",conversationController.getConversationByUsrId);

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId",conversationController.getOneToOneConv );

module.exports = router;