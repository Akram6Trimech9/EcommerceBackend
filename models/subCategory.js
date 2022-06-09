const mongoose=require('mongoose')
const subCategoryModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nomsubCategory:{type:String,required:true},
    Category:{type:mongoose.Schema.Types.ObjectId,ref:'Category'},
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'products'}]
}, {
    versionKey: false
});
module.exports=mongoose.model('subCategory',subCategoryModel);