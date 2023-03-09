var express = require("express")
var router = express.Router();
const Posts =require("../Controllers/postsController");

//GET
router.get("/posts", Posts.getFeedPosts);
router.get("/profile/posts/:userId", Posts.getUserPosts);
router.get("/posts/:userId", Posts.getFollowPosts);
router.get("/posts/comments/:postId", Posts.getPostComments);
router.get("/posts/trending/:userId", Posts.getFollowPostsByTop);
//POST
router.post("/posts", Posts.createPost);
router.post('/posts/search', Posts.searchPosts);

/* UPDATE */
router.patch("/likes/:id", Posts.likePost);
router.put('/posts/:id', Posts.updatePost)

//Delete
router.delete("/posts/:id", Posts.deletePost)







module.exports=router;