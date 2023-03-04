const express=require('express');
const Router=express.Router();
const communityController=require('../Controllers/messageController')

Router.post('/add',communityController.addMessage);



module.exports=Router;