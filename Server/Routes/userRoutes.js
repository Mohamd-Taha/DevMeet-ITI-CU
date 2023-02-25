var express = require("express")
var router = express.Router();


var userController= require('../Controllers/userController')
var authMW = require('../MiddleWares/authMW')




//get follows and followers
router.get("user/:id/following", userController.getUserFollowing)
router.get("user/:id/followers", authMW.requireAuth, userController.getUserFollowers)

//remove or add follow
router.get("user/:id/:followid", userController.getUserFollowers)
//follow a user
//unfollow a user
module.exports=router;