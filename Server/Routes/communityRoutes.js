const express=require('express');
const Router=express.Router();
const communityController=require('../Controllers/communityController')

Router.post("/create",communityController.createCommunity);
Router.post('/register',communityController.registerToCommunity)
Router.post('/getAcomm',communityController.getACommunitiesByuserId)
Router.post('/tryimage',communityController.tryImage)


module.exports=Router;

