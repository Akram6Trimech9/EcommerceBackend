const mongoose=require('mongoose')
const produitVenduModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId , 
    productvendu:{type:mongoose.Schema.Types.ObjectId,ref:'products'} ,
    panier:{type:mongoose.Schema.Types.ObjectId,ref:'panier'}
})

module.exports=mongoose.model('produitVendu',produitVenduModel)