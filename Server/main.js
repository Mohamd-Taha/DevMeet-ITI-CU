const express = require("express");
const app = express();
const PORT = process.env.PORT || 7400
const bodyParser = require("body-parser")
const path = require("path")
const Ajv = require("ajv");
var ajv = new Ajv();
const morgan = require('morgan')
const helmet= require('helmet')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(helmet());
app.use(morgan('tiny'));
dotenv.config()
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

var authRoutes = require("./Routes/authRoutes");
var Auth = require('./MiddleWares/authMW')
const userRoutes = require('./Routes/userRoutes')
const postRoutes= require('./Routes/postRoutes')
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);

// app.get('*', Auth.checkUser);

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
//this is a test commit