import mongoose, { model } from 'mongoose'
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://priyanshijain:priyanshi_2004@cluster0.aywsy.mongodb.net/thinker")

const UserSchema = new Schema ({
    username :  String,
    password :  String ,
    email : {type : String , unique : true}
})

const ContentSchema = new Schema ({
    link : {type : String},
    title : {type : String},
    type : String,
    userId : {type : mongoose.Types.ObjectId , ref :'User' , require : true},
})

const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const UserModel = model("User" , UserSchema)
const ContentModel = model("Content" , ContentSchema )
const LinkModel = model("Link" , LinkSchema)


export {
    UserModel,
    ContentModel,
    LinkModel
}