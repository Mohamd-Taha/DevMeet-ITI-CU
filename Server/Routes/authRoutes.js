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
//forgot password
router.post("/forgotpassword", authController.forgotPassword)

//reset password 
// router.get("/reset-password/:id/:token", authController)

//logout user
router.get("/logout", authController.LogoutUser)
//search user
router.post("/search", authController.searchUser)
//update user
//delete user
//get a user
//follow a user
//unfollow a user
module.exports=router;