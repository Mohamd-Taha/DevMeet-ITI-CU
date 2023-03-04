const userAuth= require("../Models/userAuthModel");

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
//get user follows

const getUserFollowing = async (req, res) => {
 const {id} = req.params;
 const user = await userAuth.findById(id).select("-password")
try{
 const formattedFollowing = user.following
 
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
 const formattedFollowers = user.followers
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
 const {id, followId} = req.params
 const user=await userAuth.findById(id).select("-password")
 const followuser=await userAuth.findById(followId).select("-password")
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
  if (req.body._id === req.params.id || req.body.isAdmin) {
      const user = await userAuth.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    
  } else {
    return res.status(403).json("You can update only your account!");
  }
}




module.exports= {getUser, updateUser, getUserFollowing, getUserFollowers, addRemoveFollow, getUserCommunities};