var jwt = require('jsonwebtoken');
const userAuth= require("../Models/userAuthModel");

const requireAuth = (req,res, next)=>{
 var Token = req.cookies.jwt //grab token from cookies
 if(!Token) {
  res.redirect('/login') //if token doesnt exist redirect to login
 }
jwt.verify(Token, "secrettoken", (err, decodedToken) =>{
if(err){
 console.log(err.message)
 res.redirect('/login')
}
else{
 next()
}
 })
 }

 const checkUser = async (req, res, next)=>{
 var Token = req.cookies.jwt

 if(token){
  jwt.verify(Token, "secrettoken", async (err, decodedToken) =>{
if(err){
 console.log(err.message)
 next()
}
else{
  let User = await userAuth.findById(decodedToken._id).exec();
 next()
}
 })
 }
 }

 module.exports = {requireAuth, checkUser}