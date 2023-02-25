const express = require("express");
const app = express();
const PORT = process.env.PORT || 7400
const bodyParser = require("body-parser")
const path = require("path")
const Ajv = require("ajv");
var ajv = new Ajv();
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser())

var usersRoutes = require("./Routes/userRoutes");
var Auth = require('./MiddleWares/authMW')
app.use(usersRoutes);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Client/index.html"));

})
//should be in routes *************
app.get("/home",Auth.requireAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"../Client/index.html"));

})
//  app.get("/set-cookies", (req,res)=>{
//     res.setHeader('Set-Cookie', "newuser=true") // old way to store cookie
//     res.cookie('newuser', false, {maxAge: 1000* 60 * 60 * 24, secure:true})  //new way to set cookie with cookie parser
//  })
app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});