var express = require("express")
var router = express.Router();
const Posts =require("../Controllers/postsController");


router.get("/posts", Posts.getFeedPosts);
router.get("/:userId/posts", Posts.getUserPosts);

/* UPDATE */
router.patch("/:id/like", Posts.likePost);










module.exports=router;