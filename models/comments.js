const mongoose=require("mongoose")
const CommentModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    description:String,
    email:String,
    rating:{type:Number,default:0},
    product:{type:mongoose.Schema.ObjectId,ref:'products'}
},
{
    versionKey:false
})
module.exports=mongoose.model('comment',CommentModel)
