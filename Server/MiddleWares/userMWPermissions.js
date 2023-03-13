var jwt = require('jsonwebtoken');
module.exports = (req,res, next)=>{
 var Token = req.header('x-auth-token') //take token from header
 if(!Token) {
  res.status(400).send("please login") //if token doesnt exist send user please login
 }
 decodePayload = jwt.verify(Token, "secrettoken")
 if(decodePayload.adminRole){
 next();  //if token is of type admin then allow him to proceed with the fetch method
 }
 else{
  res.status(400).send("Access Denied...")
 }
 }

