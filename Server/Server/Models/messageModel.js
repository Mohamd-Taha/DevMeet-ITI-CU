const mongoose=require('mongoose');

// const DB_URL = "mongodb://127.0.0.1:27017/DevMeet"
// mongoose.set('strictQuery', false);
// mongoose.connect(DB_URL, {useNewUrlParser:true});

var objId=mongoose.SchemaTypes.ObjectId

var messageScehma=mongoose.Schema({
    conversationId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,

        ref:"conversation"
    },
    text:{type:String,required:true,maxLength:200,minLength:1},
    //need to add collection ref here
    sender:{type:mongoose.SchemaTypes.ObjectId,required:true},
    image:{type:String}
    
},
{
    timestamps:true
}
)


    /**
    (members:{
        conversationId:{
            type:String,
        },
        sender:{
            type:String,
        },
        text:{
            type:String,
        },
        //added
        image:{
            type:String
        }
    }
        },
        {
            timestamps:true
        }
    );

     */


// the first argument in model function is the name of  the model in our mongoDB i.e. Messages Collections
module.exports=mongoose.model("messages",messageScehma);
