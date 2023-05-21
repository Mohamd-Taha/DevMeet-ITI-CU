const express=require('express');
const Router=express.Router();

const communityController=require('../Controllers/communityController')

Router.post("/create",communityController.createCommunity);
Router.post('/register',communityController.registerToCommunity)
Router.post('/getAcomm',communityController.getACommunitiesByuserId)
Router.post('/tryimage',communityController.tryImage)
Router.get('/getCommunityByid',communityController.getCommunityByid)
Router.get('/get',communityController.getCommunities)
Router.get('/requestToJoin',communityController.requestToJoin)
Router.get('/searchbyname',communityController.searchByCommunityName)
Router.post('/addposttocommunity',communityController.addPostToCommunity)

// Router.post('/deleteUserFromCommunity',communityController.deleteUserFromCommunity)


module.exports=Router;

