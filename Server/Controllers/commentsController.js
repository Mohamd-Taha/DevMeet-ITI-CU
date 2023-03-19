const Post= require('../Models/postAuth')
const User= require("../Models/userAuthModel");
const Comment = require("../Models/commentModel")
var jwt = require('jsonwebtoken');

const Authorize = (Token, userId)=>{
 const decoded = jwt.verify(Token, "thisissecret")
  if(decoded.userId==userId || decoded.isAdmin==true){
    return
  }
  else{
    throw Error("invalid Credentials")
  }
}

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
            post.comments.push(comment._id);
            await post.save();
            res.status(200).json(comment);
}

 const deleteComment = async (req, res) => {
 const id = req.params.id;
 const comment = await Comment.findById(id);
 const post = await Post.findById(comment.postId)
 Authorize(req.cookies.jwt, comment.userId)
  try {
     await post.updateOne({ $pull: { comments: id } });
      await comment.deleteOne();
      res.status(200).json("Comment deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports= {postComments, deleteComment};