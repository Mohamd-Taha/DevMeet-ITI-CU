const userAuth= require("../Models/userAuthModel");
var jwt = require('jsonwebtoken');

const Authorize = (Token, userId)=>{
 const decoded = jwt.verify(Token, "thisissecret")
  if(decoded.userId==userId || decoded.isAdmin==true){
    return true
  }
  else{
    return false
  }
}
//get user with id
const getUser = async (req, res)=>{
 try {
    const { id } = req.params;
    const user = await userAuth.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
const getUserByLikes = async (req, res)=>{
 try {
    const user = await userAuth.find({}).select("-password").sort({likes:-1}).limit(10);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
//get user follows

const getUserFollowing = async (req, res) => {
 const {id} = req.params;
 const user = await userAuth.findById(id).select("-password")
try{
 const formattedFollowing = await userAuth.find({_id: { $in: user.following }}).select("-password")
 
 res.status(200).json(formattedFollowing);
}
catch(err){
res.status(404).json({message: err.message + "get following error"})
}
}
//get user followers

const getUserFollowers = async (req, res) => {
 const {id} = req.params;
 const user = await userAuth.findById(id)
try{
 const formattedFollowers = await userAuth.find({_id: { $in: user.followers }}).select("-password")
 res.status(200).json(formattedFollowers);
}
catch(err){
res.status(404).json({message: err.message + "get follower error"})
}
}
//GET USER COMMUNITIES
const getUserCommunities=async(req, res)=>{
const {id}=req.body;
const UserId=id
const User = await userAuth.findOne({_id:UserId})
res.status(200).json(User.Communities)

}

//GET USER MEETUPS

const getUserMeetups=async(req, res)=>{
const {id}=req.body;
const UserId=id
const User = await userAuth.findOne({_id:UserId})
res.status(200).json(User.Meetups)

}
// add and remove follows

const addRemoveFollow = async (req,res)=>{
console.log(req.params)
 const {id, followId} = req.params
 console.log(id)
 console.log(followId)
 const user= await userAuth.findById(id).select("-password")
 const followuser=await userAuth.findById(followId).select("-password")
 console.log(user)
 console.log(followuser)
if((user && followuser) && (id!==followId)){
if(user.following.includes(followuser._id)){
user.following = user.following.filter((id)=>{
return id!==followId;
  
 })
  followuser.followers = followuser.followers.filter((id)=>{
  return id!==id;
  })
  
}
else{
 console.log("true")
 user.following.push(followId);
 followuser.followers.push(id)
}
console.log("true*****")
 await user.save();
 await followuser.save();

 const formattedFollowing = user.following
 

 res.status(200).json(formattedFollowing);

}
else{
 res.status(404).json("invalid user")
}
}

//Update User

const updateUser= async (req, res) => {
 
 if(Authorize(req.cookies.jwt, req.params.id)){
  try{
    const { firstName, lastName, city, desc, career} = req.body;
    const image1 =(req.files.image1)? req.files.image1[0].filename: "profilePic.png" ;
    const image2 =(req.files.image2)? req.files.image2[0].filename: "profileCover.png" ;
    const user = await userAuth.findById(req.params.id)
Object.assign(user, {firstName, lastName, profilePicture:image1, coverPicture:image2, city, desc, career})
console.log(user)
await user.save()
  res.status(200).json("Account has been updated");
  }
  catch(err){
  res.status(500).json(error);
  }
}
else{
  res.status(500).json("invalid credentials");
}

}


module.exports= {getUser, updateUser, getUserFollowing, getUserFollowers, addRemoveFollow, getUserCommunities, getUserByLikes};