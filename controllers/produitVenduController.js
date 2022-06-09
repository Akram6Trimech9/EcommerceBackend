const mongoose=require('mongoose')
const produitVenduModel=require('../models/produitvendu')

exports.addproduct=(req,res)=>{
  const produitVendu=new produitVenduModel({
    _id:new mongoose.Types.ObjectId(), 
        product:req.param.idprodut
})
produitVendu.save()
.then(resultat=>{
    if(resultat){
        return res.status(200).json(resultat)
    }else{
        return res.status(404).json({message:'something went wrong'})
    }
})
.catch(err=>{
    res.status(500).json(err)
})
}
