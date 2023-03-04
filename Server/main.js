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
const multer=require('multer');
const cors=require('cors')


//added to maintain omar code at models
const mongoose=require('mongoose');
const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"
mongoose.set('strictQuery', false);
mongoose.connect(DB_URL, {useNewUrlParser:true});



//multer Storage Engine
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"images"))
    },

    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }

})


//filteration to files by extension
//only accept these files
const fileFilter=(req,file,cb)=>{
    if(file.mimetype=="image/jpeg"||file.mimetype=="image/jpg"||file.mimetype=="image/png")
    cb(null,true)
    else
    cb(null,false)
}

//handle the incoming requests from the frontEnd
app.use("/images",express.static( path.join(__dirname,"images")));
app.use(multer({storage,fileFilter}).single("image"))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors({ origin: true, credentials: true }));
dotenv.config()

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

var authRoutes = require("./Routes/authRoutes");
var Auth = require('./MiddleWares/authMW')
const userRoutes = require('./Routes/userRoutes')
const commentRoutes = require('./Routes/commentRoutes')
const postRoutes= require('./Routes/postRoutes')
const communityRouter=require('./Routes/communityRoutes')
const MessageRoutes=require('./Routes/messageRoutes')

app.use(commentRoutes)
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use('/communities',communityRouter);
app.use('/messages',MessageRoutes)
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