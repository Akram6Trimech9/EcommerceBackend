const mongoose=require('mongoose')
const categoryModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    nomCategory:{type:String,required:true},
    image:String,
    subCategory:[{type:mongoose.Schema.Types.ObjectId,ref:'subCategory'}]
}, {
    versionKey: false
});
module.exports=mongoose.model('Category',categoryModel)