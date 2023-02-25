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
 userValidator= UserValidator(req.body);
 if(userValidator){
 let foundUser = await userAuth.find({email:newUser.email}).exec();
console.log(foundUser)
try{
 if(foundUser.length!=0){
        //Please Login
        res.status(400).send("User Already Exist, Please Login Now")
    }
    else{
        //Add
         var HashedPassword = await bcrypt.hash(newUser.password,10);
         newUser.password = HashedPassword;
         var newU = new userAuth(newUser);
        await newU.save();
        console.log(newU)
     const accessToken = jwt.sign({UserId:newU._id, adminRole:newU.isAdmin}, "thisissecret", {expiresIn: maxAge});
     res.cookie('jwt', accessToken, {maxAge: maxAge * 1000}) // times 1000 because cookies is in milliseconds   
     res.header("x-auth-token", accessToken)
        // res.status(201).send("Created Successfully");
        // res.redirect('/home')
        res.status(201).json({user: newU._id})
    }

}
catch(err){
    console.log(err)
}
}
else{
    res.status(400).send("You entered invalid information")
}

}
var LoginUser = async (req,res)=>{
var LoginUser=req.body;
LoginValidator = loginValidator(LoginUser)
// console.log(loginValidator)
if(LoginValidator){
    //check if user exists
    var foundUser = await userAuth.find({email:LoginUser.email}).exec();
    // console.log(foundUser)
    if(!foundUser){
       res.status(404).send("Email or password is invalid")
    }
    // check correct password
   let checkPass= await bcrypt.compare(LoginUser.password, foundUser[0].password)
   if(!checkPass){
      res.status(404).send("Email or password is invalid")
   }
   var accessToken = jwt.sign({UserId:foundUser[0]._id, adminRole:foundUser[0].isAdmin}, "thisissecret")
   res.header("x-auth-token", accessToken)
   res.cookie('jwt', accessToken, {maxAge: maxAge * 1000}) // times 1000 because cookies is in milliseconds   
//    res.status(200).send(`welcome ${foundUser[0].firstname}`)


// res.redirect('/home')
res.status(201).json({user: foundUser[0]._id})

}
else{
     res.status(404).send("enter valid Email or password")
}

}
var DisplayLogin = (req,res)=>{
      res.sendFile(path.join(__dirname,"../../Client/index.html"));
}

var DisplayRegister = (req,res)=>{
      res.sendFile(path.join(__dirname,"../../Client/index.html"));
}


var LogoutUser = (req, res)=>{
res.cookie('jwt', '', {maxAge: 1})
res.redirect('/login')
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

// var DeleteCourse = async function(req,res){
//     let Course= await coursesAuthModel.deleteOne(req.params);
//     res.send(Course)
// }


module.exports= {RegisterNewUser, LoginUser, DisplayLogin, DisplayRegister, LogoutUser};