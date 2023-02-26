const userAuth= require("../Models/userAuthModel");

const getUser = async (req, res)=>{
 try {
    const { id } = req.params;
    const user = await userAuth.findById(id);
    delete user.password
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const getUserFollowing = async (req, res) => {
 const {id} = req.params;
 const user = await userAuth.findById(id)
try{
 const formattedFollowing = user.following
 
 res.status(200).json(formattedFollowing);
}
catch(err){
res.status(404).json({message: err.message + "get following error"})
}
}

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

const addRemoveFollow = async (req,res)=>{
 const {id, followId} = req.params
 const user=await userAuth.findById(id)
 const followuser=await userAuth.findById(followId)
 delete user.password
 delete followuser.password
if(user){
if(followuser){
if(user.followings.includes(followId)){
 user.following = user.following.filter((obj)=>{
  return obj.id!==friendId;
  
 })
  followuser.follower = followuser.follower.filter((id)=>{
  return obj.id!==id;
  })
  
}
else{
  user.following.push(followeuser);
  followuser.followers.push(user);
}
 await user.save();
 await followuser.save();

 const formattedFollowing = user.following.map((follow)=>{
  return follow
 })

 res.status(200).json(formattedFollowing);

}
else{
  res.status(404).json("invalid follow user")
}
}
else{
 res.status(404).json("invalid user")
}
}



module.exports= {getUser, getUserFollowing, getUserFollowers};