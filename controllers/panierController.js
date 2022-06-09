const mongoose=require('mongoose')
const PanierModel=require('../models/Panier')
const productModel = require('../models/product')
const socket = require('socket.io-client')("http://localhost:3000");
const notificationModel = require("../models/notification");
exports.PostPanier=async (req,res)=>{
    const panier=new PanierModel( {
        _id:new mongoose.Types.ObjectId(), 
        Totalprice:req.body.Totalprice,
        Address:req.body.Address,
        Town:req.body.Town,
        State:req.body.State,
        Postcode:req.body.Postcode,
        products:req.body.products,
        user:req.body.user
    }) 
     panier.save()
      .then(result=>{
          if(result){          
                const Notification = new notificationModel({
            _id:mongoose.Types.ObjectId(),
            message:" panier Cree",
            user:req.body.user
        })
        Notification.save().then(notification_created=>{
            if(notification_created){
                socket.emit('panier_created',({message:notification_created.message}));
                return res.status(200).json({message:'panier',result})
            }
            else {
                return res.status(400).json({ message: 'rdv confirm failed' });
            }            
        })
          }else {
              return res.status(401).json({message:' something went wrong'})
          }
      })

      .catch(err=>{
          res.status(500).json(err)
      })
}
exports.getPanierByid=async (req,res)=>{
    try{
 const panier= await PanierModel.findOne({_id:req.params.id})
  panier && panier.length >0 && res.status(200).json({panier})
  panier && panier.length==0 && res.status(400).json({message:'Error'})
}catch(err){
   return res.status(500).json(err)
    }
}
exports.deletPanier=async(req,res)=>{
    try{
     const  panier=await PanierModel.findOneAndDelete({_id:req.params.id})
     if(panier){
         return res.status(200).json(panier)
     }
     else{
         return res.status(401).json({message:'something went wrong'})
     }
    }catch(err){
        return res.status(500).json(err)
    }
}
