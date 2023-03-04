const Post= require('../Models/postAuth')
const User= require("../Models/userAuthModel");
const Comment = require("../Models/commentModel")


const postComments = async (req,res)=>{
 const {userId} = req.params
  const {desc , postId, picturePath } = req.body;
  const foundUser= await User.findById(userId)
            const comment= new Comment({
                  userId,
                  postId,
                  firstName:foundUser.firstName,
                  lastName:foundUser.lastName,
                  picturePath,
                  userPicturePath:foundUser.profilePicture, 
                  desc,
            })
            await comment.save()
            const post = await Post.findById(postId);
            post.comments.push(comment._Id);
            await post.save();
            res.status(200).json(comment);
}


module.exports= {postComments};