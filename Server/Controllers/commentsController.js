const Post= require('../Models/postAuth')
const User= require("../Models/userAuthModel");
const Comment = require("../Models/commentModel")


const postComments = async (req,res)=>{
 const {userId} = req.params
  const {description , postId} = req.body;
const image1 =(req.files.image1)? req.files.image1[0].filename: null ;
  const foundUser= await User.findById(userId)
            const comment= new Comment({
                  userId,
                  postId,
                  firstName:foundUser.firstName,
                  lastName:foundUser.lastName,
                  picturePath:image1,
                  userPicturePath:foundUser.profilePicture, 
                  description,
            })
            await comment.save()
            const post = await Post.findById(postId);
            post.comments.push(comment._Id);
            await post.save();
            res.status(200).json(comment);
}


module.exports= {postComments};