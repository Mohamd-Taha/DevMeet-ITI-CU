const Post= require('../Models/postAuth')
const User= require("../Models/userAuthModel");
const Comment= require("../Models/commentModel");
const mongoose = require("mongoose");
//CREATE POST
const Authorize = ()=>{
  var Token = req.cookies.jwt
  decoded = jwt.verify(Token, "secrettoken")
  if(decoded.userId==userId || decoded.isAdmin==true){
    return
  }
  else{
    throw Error("invalid Credentials")
  }
}
const createPost = async (req, res) => {
    const { userId, description,picturePath, tags} = req.body; 
    const {file} = req
    console.log(userId)
    console.log(description)
    const user = await User.findById(userId);
    console.log(req.files)
     //edit to add profilePicture
 const image1 =(req.files.image1)? req.files.image1[0].filename: null ;
//  console.log(img1)
//  newUser={...newUser,profilePicture:img1,coverPicture:img2};
    //const user = await User.findById(userId);
    //   '/images/post.picturePath'
 PostObj={
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    description,
    picturePath: image1,
    userPicturePath: user.profilePicture,
    likes: {},
    tags
  }
  console.log(PostObj)
    const newPost = new Post(PostObj);
    await newPost.save();
    const currentUserPosts = await Post.find({ userId: userId });
    const followingPosts = await Post.find({userId: { $in: user.following }})
    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts) //combine owner posts with following posts
      .sort((a,b)=>{
          return b.createdAt - a.createdAt; //sort by date in descending
      })
      );
};
const updatePost = async (req, res) => {
  const {id} = req.params
  const { userId, desc} = req.body;
  console.log(desc)
  try {
    const post = await Post.findById(id);
    console.log(post)
    if (post.userId == userId) {
      console.log("true")
      post.description=desc
      await post.save();
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//DELETE POST
 const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);
    console.log(post)
    if (post.userId == userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log(id)
    const post = await Post.findById(id);
    const Poster = await User.findById(post.userId)
    const isLiked = post.likes.get(userId);
    console.log(isLiked)
//Check if liked
    if (isLiked) {
      post.likes.delete(userId);
      Poster.likes--
    } else {
      post.likes.set(userId, true)
      Poster.likes++
    }
    console.log(post.likes)
    console.log(post.likes.size)
//Handout badges
    if(Poster.likes==5){
      Poster.badge5Likes=true;
    }
      if(Poster.likes==10){
      Poster.badge10Likes=true;
    }
//Save to database
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
console.log(updatedPost.likes.size)
    await Poster.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const wowPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isWow = post.wow.get(userId);

    if (isWow) {
      post.wow.delete(userId);
    } else {
      post.wow.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { wow: post.wow },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const helpfulPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isHelpful = post.helpful.get(userId);

    if (isHelpful) {
      post.helpful.delete(userId);
    } else {
      post.helpful.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { helpful: helpful.wow },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//READ
//Tags removed need to be done
const getFollowPosts = async (req, res)=>{
  try{
 const {userId}=req.params
 console.log(userId)
    const currentUserPosts = await Post.find({ userId: userId });
   const user = await User.findById(userId);
   console.log(user.following)
   const followingPosts = await Post.find({userId: { $in: user.following }})

    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts) //combine owner posts with following posts
      .sort((a,b)=>{
          return b.createdAt - a.createdAt; //sort by date in descending
      })
      );
    }
  catch (error) {
    res.status(500).json(error);
  }
};


//POST
const getPostComments = async (req,res)=>{
  const {postId} = req.body;
  const post= await Post.findById(postId)
  const comment = await Comment.find({postId:post._id}).sort({createdAt:1})
  res.status(200).json(comment);
}


const searchPosts = async(req,res)=>{
const {desc} = req.body
const post = await Post.find({description: {$regex:desc}}).sort({description:1, createdAt:-1})
res.status(200).json(post)
}

const getFollowPostsByTop = async (req, res)=>{

    console.log("intop")
 const {userId}=req.params
    const currentUserPosts = await Post.find({ userId: userId });
   const user = await User.findById(userId);
   console.log(user.following)
 const followingPosts = await Post.aggregate([
  {
    $match: { userId: { $in: user.following } }
  },
  {
    $addFields: {
      trueValues: {
        $size: {
          $filter: {
            input: { $objectToArray: "$likes" },
            as: "m",
            cond: { $eq: ["$$m.v", true] }
          }
        }
      }
    }
  },
  {
    $sort: { trueValues: -1, createdAt: -1 }
  }
]);

   console.log(followingPosts, "******")
    res
      .status(200)
      .json(followingPosts) //combine owner posts with following posts
      // .sort((a,b)=>{
      //     return b.createdAt - a.createdAt; //sort by date in descending
      // }
};

const getTopPostsbyTags = async (req, res)=>{
 const {inputTags} = req.body
 
  const trendingPosts = await Post.aggregate([
  {
    $match: { tags: { $in: [inputTags] } }
  },
  {
    $addFields: {
      trueValues: {
        $size: {
          $filter: {
            input: { $objectToArray: "$likes" },
            as: "m",
            cond: { $eq: ["$$m.v", true] }
          }
        }
      }
    }
  },
  {
   
  },
  {
    $sort: { trueValues: -1, createdAt: -1 }
  },
  { $limit: 20 }
])


}


module.exports= {createPost, getFeedPosts, getUserPosts, likePost, wowPost, helpfulPost, getFollowPosts, getPostComments, deletePost, updatePost,searchPosts, getFollowPostsByTop, getTopPostsbyTags};