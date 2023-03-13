const communityModel = require("../Models/communityModel");
const userAuthModel = require("../Models/userAuthModel");


var createCommunity = async (req, res) => {
    console.log("from create communit method")
    //this line blow was used only to tes
    // var { communityName: name, communityAdmin: admin, communityDescription: desc ,AdminName:aName,registeredNumber:registNo,posts:posts} = req.body;

    var { communityName: name, adminId: admin, communityDescription: desc, AdminName: aName } = req.body;
    // handle pics returning from multer
    image1 = (req.files.image1) ? req.files.image1[0].filename : "CommunityCover.png";
    image2 = (req.files.image2) ? req.files.image2[0].filename : "CommunityIcon.png";

    console.log("start fun")
    var obk = { adminId: admin, adminName: aName }
    var commModel = new communityModel({
        communityName: name, communityAdmin: obk,
        communityDescription: desc, commiunityIcon: image2,
        commiunityCover:image1
    });

    await commModel.save();
    res.json(commModel);

}

const getCommunities = async (req,res)=>{
    console.log("******entered get communities")
    const communities = await communityModel.find({}).limit(10)
    res.status(200).json(communities)
}


var registerToCommunity = async (req, res) => {
    var { userId, communityId } = req.body;
    console.log("inside registerToCommunity")
    var comm = await communityModel.findById(communityId);
    comm.registeredUsers.push(communityId);
    comm.registeredNumber += 1;
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

    var { userId } = req.body;
    console.log(userId);
    console.log(typeof userId)
    var x = await userAuthModel.findById(userId).populate('communities');
    // var x = await userAuthModel.find({ _id: userId }).populate('posts')
    //.select('communities')
    // console.log(x);

    await res.send(x);

}

//just for test multer functionality
var tryImage = (req, res) => {
    console.log("image")
    res.json({ body: req.body, file: req.file })
}


var getCommunityByid = async (req, res) => {
    let communityiD = req.query.id;
    //let {communityiD}=req.body;
    console.log("the nono is below")
    console.log(communityiD)
    //if( communityiD.match(/^[0-9a-fA-F]{24}$/))
    //{
    console.log("validation is true");

    newComm = await communityModel.findById(communityiD)
        .populate('posts')
        .then(user => {
            res.json(user);
        });

    // .exec((err ) => {
    //     if (err) return handleError(err);
    //     console.log('ERORRRRR');
    // });
    // res.json(newComm)
    //}

    // else{
    //     res.json({st:"fail"})
    // }

}

var addPostToCommunity = async (req, res) => {
    //inputs are communityID & postId
    var { postId, CommunityId } = req.body;
    let newComm = communityModel.findById(CommunityId);
    newComm.posts.push(postId);
    newComm.save();
    res.json({ status: "DONE" })
}



var requestToJoin = async (req, res) => {
    var { userId, communityId } = req.body;
    console.log("inside registerToCommunity")
    var comm = await communityModel.findById(communityId);
    comm.joinRequests.push(communityId);
    await comm.save();
    console.log(comm);

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

module.exports = {
    createCommunity, registerToCommunity, getACommunitiesByuserId,
    tryImage, getCommunityByid, requestToJoin, getCommunities
}
