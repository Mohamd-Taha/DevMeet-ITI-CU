var express = require("express")
var router = express.Router();
const Comments= require("../Controllers/commentsController")

var authMW = require('../MiddleWares/authMW')

//POST comments
router.post("/comments/:userId", Comments.postComments)



module.exports=router;