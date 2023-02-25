var express = require("express")
var router = express.Router();


var UserController= require('../Controllers/userController')
var userPermissions = require('../MiddleWares/userMWPermissions')


router.post("/register", UserController.RegisterNewUser),
router.post("/login", UserController.LoginUser)
router.get("/login", UserController.DisplayLogin)
router.get("/register", UserController.DisplayRegister)
router.get("/logout", UserController.LogoutUser)

module.exports=router;