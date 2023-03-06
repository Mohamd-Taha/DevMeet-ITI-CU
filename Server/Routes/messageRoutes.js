const router = require("express").Router();
const messageCotroller=require('../Controllers/messageController')

//add
router.post("/", messageCotroller.addMessage);

//get
router.get("/:conversationId", messageCotroller.getMessages);

module.exports = router;


/**
 * The code blow is M.Taha work and replaced by emy code after refining it to be MVC 
const express=require('express');
const Router=express.Router();
const communityController=require('../Controllers/messageController')

Router.post('/add',communityController.addMessage);

module.exports=Router;

 */







