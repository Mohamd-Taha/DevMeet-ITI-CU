var express = require("express")
var router = express.Router();
const Comments= require("../Controllers/commentsController")

var authMW = require('../MiddleWares/authMW')

//POST comments
router.post("/comments/:userId", Comments.postComments)

router.delete("/comments/:id", authMW.requireAuth, Comments.deleteComment)



module.exports=router;