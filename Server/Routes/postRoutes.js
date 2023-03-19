var express = require("express");
var router = express.Router();
const Posts = require("../Controllers/postsController");
var authMW = require("../MiddleWares/authMW");
//GET
router.get("/posts", Posts.getFeedPosts);
router.get("/profile/posts/:userId", Posts.getUserPosts);
router.get("/posts/:userId", Posts.getFollowPosts);
router.get("/posts/comments/:postId", Posts.getPostComments);
router.get("/posts/trending/:userId", Posts.getFollowPostsByTop);
router.get("/posts/tags/:tag", Posts.getTopPostsbyTags);

//POST
router.post("/posts", Posts.createPost);
router.post("/posts/search", Posts.searchPosts);

/* UPDATE */
router.patch("/likes/:id", Posts.likePost);
router.get("/likeCheck/:id/:userId", Posts.likePost);
router.put("/posts/:id", Posts.updatePost);

//Delete
router.delete("/posts/:id", authMW.requireAuth, Posts.deletePost);

module.exports = router;
