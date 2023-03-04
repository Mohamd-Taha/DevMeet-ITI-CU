var express = require("express")
var router = express.Router();

 
var authController= require('../Controllers/authController')
var authMW = require('../MiddleWares/authMW')

//register user
router.post("/register", authController.RegisterNewUser),
//login user
router.post("/login", authController.LoginUser)
//render login page
/** 
router.get("/login", authController.DisplayLogin)
//render register page
router.get("/register", authController.DisplayRegister)
*/
//logout user
router.get("/logout", authController.LogoutUser)
//update user
//delete user
//get a user
//follow a user
//unfollow a user
module.exports=router;