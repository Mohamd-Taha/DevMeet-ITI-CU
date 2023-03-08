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
const upload = multer({dest: './images' });
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
     const filename = `${Date.now()}_${file.originalname.replace(/\s+/g,'-')}`
        cb(null,filename)
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
app.use(multer({storage,fileFilter}).fields([{name:"image1",maxCount: 1},{name:"image2"}]))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(helmet({
      crossOriginResourcePolicy: false,
    }))
app.use(morgan('tiny'));
app.use(cors({ origin: true, credentials: true }));
dotenv.config()


//Routes constants
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

var authRoutes = require("./Routes/authRoutes");
var Auth = require('./MiddleWares/authMW')
const userRoutes = require('./Routes/userRoutes')
const commentRoutes = require('./Routes/commentRoutes')
const postRoutes= require('./Routes/postRoutes')
const communityRouter=require('./Routes/communityRoutes')
const messageRoute=require("./Routes/messageRoutes")
const conversationRoute=require("./Routes/conversationRoutes")
const notificationRoutes= require('./Routes/notificationRoutes')
const zoomMeetingRoutes=require('./Routes/zoomMeetingRoutes')



//routes middlewares
app.use(commentRoutes)
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(notificationRoutes);
app.use('/communities',communityRouter);
app.use("api/conversations",conversationRoute)
app.use("api/messages",messageRoute)
app.use('/api/zoom-meetings', zoomMeetingRoutes);

// app.get('*', Auth.checkUser);


//  app.get("/set-cookies", (req,res)=>{
//     res.setHeader('Set-Cookie', "newuser=true") // old way to store cookie
//     res.cookie('newuser', false, {maxAge: 1000* 60 * 60 * 24, secure:true})  //new way to set cookie with cookie parser
//  })
app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});
//this is a test commit