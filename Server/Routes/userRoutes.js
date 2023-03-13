var express = require("express")
var router = express.Router();


var userController= require('../Controllers/userController')
var authMW = require('../MiddleWares/authMW')

//get follows and followers
router.get("/user/:id", userController.getUser)
router.get("/user/following/:id", userController.getUserFollowing)
router.get("/user/followers/:id", userController.getUserFollowers)
//get users by likes
router.get("/user/top/likes", userController.getUserByLikes)

//remove or add follow
router.patch("/user/:id/:followId", userController.addRemoveFollow)

router.put("/user/:id", authMW.requireAuth, userController.updateUser)
//follow a user
//unfollow a user
module.exports=router;