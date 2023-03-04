const communityModel = require("../Models/communityModel");
const userAuthModel = require("../Models/userAuthModel");


var createCommunity = async (req, res) => {
    var { communityName: name, communityAdmin: admin, communityDescription: desc } = req.body;
    //I'm not sure about the following line of code 
    var image=req.file.filename?req.file.filename:"" 
    // var data=JSON.parse(req.body);

    console.log(req.body);
    // console.log(name);
    var commModel = new communityModel({ communityName: name, communityAdmin: admin, communityDescription: desc,commiunityIcon:image });
    // commModel.communityName=name;
    // commModel.communityDescription=desc;
    // commModel.communityAdmin=usradminId;

    await commModel.save();
    res.send(commModel.toJSON())
}


var registerToCommunity = async (req, res) => {
    var { userId, communityId } = req.body;
    var comm = await communityModel.findById(communityId);
    // console.log(comm);
    comm.registeredusers.push(communityId);
    await comm.save();
    var usr = await userAuthModel.findById(userId);
    usr.communitites.push(communityId);
    await usr.save();
    console.log(comm.registeredusers)
    res.send("added succefully");

    // var selectedUser=userAuthModel.findById(userId);
    // console.log(selectedUser._id);
    // selectedUser.posts.get
}
//route communities/getAcomm
var getACommunitiesByuserId = async (req, res) => {

    var {userId} = req.body;
    console.log(userId);
    console.log(typeof userId)
    // var x = await userAuthModel.findById(userId).populate('communitites');
    var x = await userAuthModel.find({_id:userId})

    //.select('communities')

    console.log(x);

    await res.send(x);

}

var tryImage = (req, res) => {
    res.json({body:req.body,file:req.file})
}

// var editCommunity=async (req,res)=>{

// }

//getCommunityAdmin
/*


var getCommunityAdminbyId=async (req,res)=>{
    var communityID=req.params.id;
   var adminObj= communityModel.populate('communityAdmin');
    console.log(adminObj);
    res.send( adminObj);

}
//accept join requests
//from which controller >> responsible for adding request join ? from the user cont : from community 

*/
module.exports = { createCommunity, registerToCommunity, getACommunitiesByuserId,tryImage };
