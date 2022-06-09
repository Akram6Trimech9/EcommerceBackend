const mongoose=require('mongoose');
const ratingModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ratingTotal:{type:Number,default:0},
    ratenumber:{type:Number},
    ratieBy:String,
    product:{type:mongoose.Schema.Types.ObjectId,ref:'products'}
},{
    versionKey:false
})
module.exports=mongoose.model('rates',ratingModel)