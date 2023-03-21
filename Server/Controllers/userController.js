const userAuth = require("../Models/userAuthModel");
var jwt = require('jsonwebtoken');

const Authorize = (Token, userId) => {
  const decoded = jwt.verify(Token, "thisissecret")
  if (decoded.userId == userId || decoded.isAdmin == true) {
    return true
  }
  else {
    return false
  }
}
//get user with id
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userAuth.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
const getUserByLikes = async (req, res) => {
  try {
    const user = await userAuth.find({}).select("-password").sort({ likes: -1 }).limit(10);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
//get user follows

const getUserFollowing = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userAuth.findById(id).select("-password")
    const formattedFollowing = await userAuth.find({ _id: { $in: user.following } }).select("-password")

    res.status(200).json(formattedFollowing);
  }
  catch (err) {
    res.status(404).json({ message: err.message + "get following error" })
  }
}
//get user followers

const getUserFollowers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userAuth.findById(id)
    const formattedFollowers = await userAuth.find({ _id: { $in: user.followers } }).select("-password")
    res.status(200).json(formattedFollowers);
  }
  catch (err) {
    res.status(404).json({ message: err.message + "get follower error" })
  }
}
//GET USER COMMUNITIES
const getUserCommunities = async (req, res) => {
  try{
  const { id } = req.body;
  const UserId = id
  const User = await userAuth.findOne({ _id: UserId })
  res.status(200).json(User.Communities)
  }
  catch(err){
     res.status(404).json({ message: err.message})
  }

}

//GET USER MEETUPS

const getUserMeetups = async (req, res) => {
  const { id } = req.body;
  const UserId = id
  const User = await userAuth.findOne({ _id: UserId })
  res.status(200).json(User.Meetups)

}
// add and remove follows

const addRemoveFollow = async (req,res)=>{
try{
 const {id, followId} = req.params
 const user= await userAuth.findById(id).select("-password")
 const followuser=await userAuth.findById(followId).select("-password")
if((user && followuser) && (id!=followId)){
if(user.following.includes(followuser._id)){
const index = user.following.indexOf(followId);
if (index !== -1) {
  user.following.splice(index, 1);
}
const followIndex = followuser.followers.indexOf(id);
if (followIndex !== -1) {
  followuser.followers.splice(followIndex, 1);
}
}
else{
 console.log("true")
 user.following.push(followId);
 followuser.followers.push(id)
 console.log("followed")
}
 await user.save();
 await followuser.save();

    const formattedFollowing = user.following


    res.status(200).json(formattedFollowing);

  }
  else {
    res.status(404).json("invalid user")
  }
}
catch(err){
   res.status(404).json({ message: err.message})
}
}

//Update User

const updateUser = async (req, res) => {

  if (Authorize(req.cookies.jwt, req.params.id)) {
    try {
      const user = await userAuth.findById(req.params.id)
      const { firstName, lastName, city, desc, career } = req.body;
      console.log(req.files.image1)
      const image1 = (req.files.image1) ? req.files.image1[0].filename : user.profilePicture;
      console.log(image1)
      const image2 = (req.files.image2) ? req.files.image2[0].filename : user.coverPicture;
      console.log(image2)

      Object.assign(user, { firstName, lastName, profilePicture: image1, coverPicture: image2, city, desc, career })
      console.log(user)
      await user.save()
      res.status(200).json({ user: user });
    }
    catch (err) {
      res.status(500).json(error);
    }
  }
  else {
    res.status(500).json("invalid credentials");
  }

}


module.exports = { getUser, updateUser, getUserFollowing, getUserFollowers, addRemoveFollow, getUserCommunities, getUserByLikes };