const mongoose=require('mongoose');
 const productsModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    titre:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    dateCreation:{type:Date},
    nbVisiteurs:{type:Number,default:0},
    comment:[{type:mongoose.Schema.Types.ObjectId,ref:'comment'}],
    subcategory:{type:mongoose.Schema.Types.ObjectId,ref:'subCategory'},
    rates:{type:mongoose.Schema.Types.ObjectId,ref:'rates'}
},{
    versionKey: false
})
module.exports=mongoose.model('products',productsModel)