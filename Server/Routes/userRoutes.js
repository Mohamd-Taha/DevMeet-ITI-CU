var express = require("express")
var router = express.Router();


var userController= require('../Controllers/userController')
var authMW = require('../MiddleWares/authMW')




//get follows and followers
router.get("/user/:id", userController.getUser)
router.get("/user/:id/following", userController.getUserFollowing)
router.get("/user/:id/followers", userController.getUserFollowers)

//remove or add follow
router.patch("/user/:id/:followid", userController.addRemoveFollow)
//follow a user
//unfollow a user
module.exports=router;