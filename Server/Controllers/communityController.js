const communityModel = require("../Models/communityModel");
const userAuthModel = require("../Models/userAuthModel");


var createCommunity = async (req, res) => {
    var { communityName: name, communityAdmin: admin, communityDescription: desc ,AdminName:aName,registeredNumber:registNo} = req.body;
    console.log(req.files)
    image = (req.files)? req.files.image1[0].filename : "CommunityCover.png" ;

    //I'm not sure about the following line of code 
    console.log("start fun")
    
    // var image=req.file.filename ;
    // const image = req.files.image1[0].filename;

    // var image=undefined;
    // var image= ()=>req.file.filename ? req.file.filename : "not found"
    var obk={adminId:admin,AdminName:aName,adminPic:"null"}
    console.log(image);
    var commModel = new communityModel({ communityName: name, communityAdmin: obk,
        communityDescription: desc,commiunityIcon:image,registeredNumber:registNo });
    

    await commModel.save();
    res.json(commModel);

}


var registerToCommunity = async (req, res) => {
    var { userId, communityId } = req.body;
    console.log( "inside registerToCommunity")
    var comm = await communityModel.findById(communityId);
    comm.registeredUsers.push(communityId);
    await comm.save();
    console.log(comm);

    console.log("after pushing in the array")
    var usr = await userAuthModel.findById(userId);
    usr.communities.push(communityId);
    await usr.save();
    // console.log(comm.registeredusers)
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
    console.log("image")
    res.json({body:req.body,file:req.file})
}


var getCommunityByid=async (req,res)=>{
    let communityiD=req.query.id;
    console.log("the id is below")
    console.log(communityiD)
   if( communityiD.match(/^[0-9a-fA-F]{24}$/))
   {newComm= await communityModel.findById(communityiD);
    // res.send(newComm)
    res.json(newComm)}
    else{
        res.json({st:"fail"})
    }
     
}


// var deleteUserFromCommunity =(req,res)=>{
//     //delete the user from array list of the community
//         let { userId, communityId } = req.body;
//     let comm =communityModel.findById(communityId)

//     let indexOfUser=comm.registeredUsers.findIndex(userId)
//     comm.registeredUsers.splice(indexOfUser,1)
//     comm.save();

//     //delete the user from the array of the user communitits property

    

    

//     //.registeredUsers.findIndex(userId)



// }
 

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

module.exports = { createCommunity, registerToCommunity, getACommunitiesByuserId,
    tryImage,getCommunityByid }
