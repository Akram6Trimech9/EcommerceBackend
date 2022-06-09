const mongoose=require('mongoose')
const panierModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,  
    Totalprice: {type:Number,required:true},
    Address : {type:String,required:true},
    Town: {type:String,required:true},
    State : {type:String,required:true},
    Postcode : {type:String,required:true},
    products: [
        {
          productId: {
            type: String,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],

       user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{
    versionKey:false }

)
module.exports=mongoose.model('panier',panierModel)
 
 