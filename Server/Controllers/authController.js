const bcrypt = require("bcrypt");
const userAuth= require("../Models/userAuthModel");
const UserValidator = require("../Utils/userValidator");
const  jwt = require('jsonwebtoken');
const path = require("path")
//require('dotenv').config();
const loginValidator = require("../Utils/loginValidator")
const maxAge = 3*24*60*60 //expiration data for cookies



var RegisterNewUser = async (req, res)=>{
 var newUser= req.body;
 console.log("from register new user")
 

 //edit to add profilePicture
 img1="profilePic.png" ;
 img2="profileCover.png" ;
//  img1=(req.files)? req.files.image1[0].filename : "profilePic.png" ;
//  img2=(req.files)? req.files.image2[0].filename : "profileCover.png" ;
 
//  img1= "profilePic.png" ;
//  img2= "profileCover.png" ;

 newUser={...newUser,profilePicture:img1,coverPicture:img2};
 console.log(newUser)
 var userValidator= UserValidator(newUser);
 try{
 if(userValidator){
console.log("true")
 let foundUser = await userAuth.find({email:newUser.email}).exec();
 if(foundUser.length!=0){
        //Please Login
        throw Error ("User Already Exist, Please Login Now")
    }
    else{
        //Add
         var HashedPassword = await bcrypt.hash(newUser.password,10);
         newUser.password = HashedPassword;
         var newU = new userAuth(newUser);
         console.log(newU)
        await newU.save();
        console.log("user saved")
        console.log(newU)
     const accessToken = jwt.sign({userId:newU._id, adminRole:newU.isAdmin}, "thisissecret", {expiresIn: maxAge});
     res.cookie('jwt', accessToken, {maxAge: maxAge * 1000}) // times 1000 because cookies is in milliseconds   
     res.header("x-auth-token", accessToken)
        // res.status(201).send("Created Successfully");
        // res.redirect('/home')
        res.status(201).json({user: newU})
    }

}
else{
    throw Error("You entered invalid information ajv error")
}
 }
catch(error){
    res.status(400).json({error: error.message})
}


}
var LoginUser = async (req,res)=>{
var LoginUser=req.body;
LoginValidator = loginValidator(LoginUser)
// console.log(loginValidator)
try{
if(LoginValidator){
    console.log("true")
    //check if user exists
    var foundUser = await userAuth.find({email:LoginUser.email}).exec();
    console.log(foundUser)
    if(!foundUser){
    console.log('error thrown')
    throw Error ("Email or password is invalid")
    }
    // check correct password
   let checkPass= await bcrypt.compare(LoginUser.password, foundUser[0].password)
   if(!checkPass){
      throw Error ("Email or password is invalid")
   }
   console.log("this is the login method")
   var accessToken = jwt.sign({userId:foundUser[0]._id, adminRole:foundUser[0].isAdmin}, "thisissecret")
   res.header("x-auth-token", accessToken)
   res.cookie('jwt', accessToken, {maxAge: maxAge * 1000}) // times 1000 because cookies is in milliseconds   
//    res.status(200).send(`welcome ${foundUser[0].firstname}`)


// res.redirect('/home')
res.status(201).json({user: foundUser[0]})

}
else{
     throw Error ("enter valid Email or password")
}
}
catch(error){
res.status(400).json({error: error.message})
}

}


var LogoutUser = (req, res)=>{
res.cookie('jwt', '', {maxAge: 1})
return res.send("log out succesful")
}





//get all group messages that the user have
//need to change name to conversation 
var getAGroupMessages=(req,res)=>{
    var{userId}=req.body;
    var messages=userAuth.findById(userId).select('groupsMessage');
    // var names=[];
    // for (let i=0;i++;i<messages.length)
    // {
    //     names.push(messages[0].groupName)
    // }
    // res.send(names);
    res.send(messages);

}

//searchByname
// result is the fName,Lname,city,career,Picture

var searchUser= async (req, res)=>{
    var {firstName,lastName}=req.body;
    if(firstName&&lastName){
    var ussersArray=await userAuth.find({firstName:{ $regex : new RegExp(firstName, "i") },lastName: {$regex : new RegExp(lastName,"i") }});
    }
    else{
    var ussersArray=await userAuth.find({firstName:{ $regex : new RegExp(firstName, "i") }});
    }
    res.json(ussersArray);
    
}






// var GetAllCourses = async function (req , res) {
  
//    let allcourses =await coursesAuthModel.find({}).exec();
//    res.status(200).send(allcourses)
//    }

// var GetCourseByName = async function (req , res) {
//     let name=req.params.name;
//     let foundcourse =await coursesAuthModel.find({name:name}).exec();
//     res.status(200).send(foundcourse)
//     }
 
// var UpdateCourse= async function (req,res){
//     try{
//         let Course= await coursesAuthModel.updateOne(
//             req.params,
//             {$set: req.body}
//         );
//         res.status(201).send(Course);
      
//     }
//     catch{
//         res.status(404).send({error:"Course is not found"});
//     }
// }



module.exports= {RegisterNewUser, LoginUser, LogoutUser, searchUser};