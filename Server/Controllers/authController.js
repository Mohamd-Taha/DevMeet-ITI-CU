const bcrypt = require("bcrypt");
const userAuth= require("../Models/userAuthModel");
const UserValidator = require("../Utils/userValidator");
const  jwt = require('jsonwebtoken');
const path = require("path")
const nodemailer = require('nodemailer');
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
 if(newUser.password.length<5){
    throw Error ("Password must be at least 5 characters")
 }
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
    throw Error("You entered invalid information")
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
    var foundUser = await userAuth.find({email:LoginUser.email})
    console.log(foundUser)
    if(foundUser.length==0){
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
     throw Error ("Email or password is invalid")
}
}
catch(error){
console.log('inside error')
res.status(400).json({error: error.message})
}

}


var LogoutUser = (req, res)=>{
res.cookie('jwt', '', {maxAge: 1})
return res.send("log out succesful")
}


var forgotPassword = async (req,res)=>{
const {email} = req.body;
let foundUser = await userAuth.findOne({email:email}).exec();
try{
if(!foundUser){
throw Error("User doesn't exist")
}
const secret= "thisissecret" + foundUser.password
const payload ={
    email: foundUser.email,
    id: foundUser._id
}
const token = jwt.sign(payload, secret, {expiresIn: '15m'})
const link= `http://localhost:3000/reset-password/${foundUser._id}/${token}`
console.log(foundUser.email)
sendEmail(foundUser.email, link)
console.log(link)
res.status(200).send("mail has been sent")
}
catch(err){
    console.log(err)
}
}

var resetPassword = async(req, res)=>{
    const{id, token} = req.params
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
    try{
    var {firstName,lastName}=req.body;
    if(firstName&&lastName){
    var ussersArray=await userAuth.find({firstName:{ $regex : new RegExp(firstName, "i") },lastName: {$regex : new RegExp(lastName,"i") }});
    }
    else{
    var ussersArray=await userAuth.find({firstName:{ $regex : new RegExp(firstName, "i") }});
    }
    res.json(ussersArray);
}
catch(err){
     res.status(404).json({ message: err.message})
}
    
}


function sendEmail(recipient_email, link ) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user:"devmeet2023@outlook.com",
        pass:"devmeet23"
      },
    });

    console.log(recipient_email, "+++++++++")

    const mail_configs = {
      from: "devmeet2023@outlook.com",
      to: recipient_email,
      subject: "DEVMEET PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">DEVMEET</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing DEVMEET. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 15 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${link}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
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



module.exports= {RegisterNewUser, LoginUser, LogoutUser, searchUser, forgotPassword};