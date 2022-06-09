const mongoose=require("mongoose");
const userModel=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId, 
    nom:{type:String ,required:true},
    prenom:{type:String,required:true},
    mdp:{type:String,required:true},
    numtel:{type:String,required:true},
    cin:{type:String ,required:true},
    role: {
        type: String,
        enum: ['client', 'fournisseur','admin']
    },   
    email: { type: String, required: true },
    image:{type:String,required:true},
 
}, {
    versionKey: false
});
module.exports=mongoose.model('user',userModel)