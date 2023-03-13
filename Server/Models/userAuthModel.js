const mongoose = require("mongoose");
const validator = require("validator")
const  jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const maxAge = 3*24*60*60

var usersSchema=new mongoose.Schema({
   
 firstName:{type:String, pattern:"/[0-9a-zA-Z]{3,}/", required:true},
 lastName:{type:String, pattern:"/[0-9a-zA-Z]{3,}/",  required:true},
 email:{type:String,  validate:{
            validator:(val)=>{return validator.isEmail(val)},
            message:"Email Not Valid"}, required:[true,"Please enter an email"], unique:true, lowercase:true
},
 password:{type:String,minlength:[5,"Please enter a minimum password of 5 characters"], required:[true, "Please enter a password"]},
 isAdmin:{type:Boolean, default:false},
 profilePicture:{
  type:String,
  default:""
 },
 
 coverPicture:{
  type:String,
  default:""
 },
 followers:{
  type:[mongoose.Schema.Types.ObjectId],
  default:[]
 },
 //add ref
communities:{
type:[mongoose.Schema.Types.ObjectId],
ref:"communities" ,
default:[]},
  //add ref

 meetups:{
  type:[mongoose.Schema.Types.ObjectId],
  default:[]
 },
  following:{
  type:[mongoose.Schema.Types.ObjectId],
  default:[]
 },
 desc:{
  type:String,
  max:100,
  default: ""
 },
 city:{
  type:String,
  max:20,
  default: ""
 },
  likes:{
  type:Number,
  default: 0
 },
  badge5Likes:{
  type:Boolean,
  default:false
 },
  badge10Likes:{
  type:Boolean,
  default:false
 },
mentoring:{
 type:Array
},
mentoredBy:{
 type:Array
},
////taha added
groupsMessage: [
    {
       groupId: { type: mongoose.SchemaTypes.ObjectId, ref: "communities" },
       groupName: { type: String }

    }],

    career: {
       type: String
       
    }

},
{timestamps:true}
)

// usersSchema.post('save', function(doc, next){
// const accessToken = jwt.sign({UserId:doc._id, adminRole:doc.isAdmin}, "thisissecret", {expiresIn: maxAge});
//      res.cookie('jwt', accessToken, {maxAge: maxAge * 1000}) // times 1000 because cookies is in milliseconds   
//      res.header("x-auth-token", accessToken)
// console.log(doc)
// console.log("new user was created and saved")
//  next();

// })

// usersSchema.pre('save', function(next){
 
// console.log("new user about to be created and saved", this);
//  next();

// })

module.exports=mongoose.model("users", usersSchema);