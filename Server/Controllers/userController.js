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
// add and remove follows

const addRemoveFollow = async (req,res)=>{
 const {id, followid} = req.params
 const user=await userAuth.findById(id).select("-password")
 const followuser=await userAuth.findById(followid).select("-password")
if((user && followuser) && (id!==followid)){
if(user.following.includes(followuser._id)){
 user.following = user.following.filter((id)=>{
  return id!==followid;
  
 })
  followuser.followers = followuser.followers.filter((id)=>{
  return id!==id;
  })
  
}
else{
 console.log("true")
  user.following.push(followid);
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



module.exports= {getUser, getUserFollowing, getUserFollowers, addRemoveFollow};