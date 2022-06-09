const bcrypt=require("bcrypt");
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken')
const usermodel=require('../models/user');
exports.getbothof=async(req,res)=>{
    try{
      const users=await usermodel.find({$or:[{role:'conseiller'},{role:'fournisseur'}]});
      users && users.length>0 && res.status(200).json(users);
      users && users.length==0 && res.status(404).json({message:'users not found'})
    }catch(err){
         return res.status(500).json(err)
    }
}

exports.getAdmin=async(req,res)=>{
    try{
      const admin=await usermodel.findOne({role:'admin'})
    admin && admin.length>0 && res.status(200).json(admin)
    admin && admin.length==0 && res.status(404).json({message:'admin not found'})   
    }catch(err){
        return res.status(500).json(err)
    }
}
exports.getallfournisseur=async(req,res)=>{
    try{ 
         const fournisseur=await usermodel.find({role:'fournisseur'})   
         fournisseur && fournisseur.length>0 && res.status(200).json(fournisseur);
         fournisseur && fournisseur.length==0 && res.status(404).json({message:'fournisseur not found'})
    }catch(err){
        return res.status(500).json(err)
    }
}
exports.getallclients=(req,res)=>{
   usermodel.find({role:'client'})
   .exec()
   .then(clients=>{
        if(clients){
            clients.map(result=>{
                if(result.image){
                    result.image="http://localhost:3000/" + result.image.split("\\")[0]+ "/"+ result.image.split("\\")[1] ;
                }
                return result
            })
           res.status(200).json(clients)        
        }
        else{
            res.status(404).json({message:'there is no clients'})
        }
   })
   .catch(err=>{
       res.status(500).json(err)
   })
}
exports.signup= async (req,res)=>{
 try{
  const user=await usermodel.findOne({$and:[{email:req.body.email},{cin:req.body.cin}]})
    user &&  user.length>0 &&  res.status(401).json({message:'email exist try another one'})
    !user && bcrypt.hash(req.body.mdp,10,(err,encrypted)=>{
         if(err){
             return new Error("crypting Error")
         }
         if(encrypted){
             const user=new usermodel({
                 _id:new mongoose.Types.ObjectId(),
                 nom:req.body.nom,
                 prenom:req.body.prenom,
                 mdp:encrypted,
                //  genre:req.body.nom,
                 numtel:req.body.numtel,
                 cin:req.body.cin,
                 role: req.body.role,
                 email: req.body.email,
                 image:req.file.path
                })
             user.save()
             .then(user=>{
                 if(user){
                     return res.status(201).json({message:'user created',user})
                 }else{
                     return res.status(401).json({message:'something went wrong'})
                 }
             })
             .catch(err=>{{
                    return res.status(500).json(err);
             }})
         }
    })
 }catch(err){
    return res.status(500).json(err) ; 
 }
}

exports.login=async (req,res)=>{
 try{
        const user= await usermodel.findOne({email:req.body.email})
         if(user){
             bcrypt.compare(req.body.mdp,user.mdp,(err,same)=>{
                 if(err){
                     return new Error("comparing failed");
                 }
                 if(same){
                     let nom=user.nom ; 
                     let role=user.role ; 
                     const token=jwt.sign({user_id:user._id,role:user.role,nom:user.nom},"secrets",{ expiresIn: 60 * 60 * 60 })
                     return res.status(200).json({message:'login Succesfully',token,nom,role})
                 }else { 
                     return res.status(401).json({message:'mdp incorrect'});
                 }
             })
         } 
 } catch(err){
 return res.status(500).json(err)
 }
}


exports.updatefournisseur = (req,res)=>{
    userModel.findOne({$and:[{_id:req.params.id},{role:"fournisseur"}]})
    .exec()
    .then(async user => {
        if (user) {
            if(req.body.mdp){
             const  encrypted = await  bcrypt.hash(req.body.mdp, 10);
             user.mdp=encrypted;

        }
        Object.keys(req.body).forEach(element=>{
            if(element.toString() !== "mdp"){
                user[element]=req.body[element]
            }
        })
        
        user.save().then(result=>{
            if(result){
                return res.status(200).json({message:'update done ',user})
               }
               else {
                   return res.status(400).json({message:'update failed'});
               }
        }).catch(err=>{
            return res.status(500).json(err);
        })
    }
    else {
        return res.status(404).json({message:'fournisseur not found'});

    }
})    

    .catch(err => {
        return res.status(500).json(err)
    })
}


exports.updateClient = (req,res)=>{

    userModel.findOne({$and:[{_id:req.params.id},{role:"client"}]})
    .exec()
    .then(async user => {
        if (user) {
            if(req.body.mdp){

             const  encrypted = await  bcrypt.hash(req.body.mdp, 10);
             user.mdp=encrypted;

        }
        Object.keys(req.body).forEach(element=>{
            if(element.toString() !== "mdp"){
                user[element]=req.body[element]
            }
        })
        
        user.save().then(result=>{
            if(result){
                return res.status(200).json({message:'update done ',user})
               }
               else {
                   return res.status(400).json({message:'update failed'});
               }
        }).catch(err=>{
            return res.status(500).json(err);
        })
    }
    else {
        return res.status(404).json({message:'conseiller not found'});

    }
})   
    .catch(err => {
        return res.status(500).json(err)
    })
}
exports.deleteClient= (req,res)=>{
            usermodel.findOneAndDelete({$and:[{role:'client'},{_id:req.params.id}]})
            .exec()
            .then(resultat=>{
                if(resultat){
                      return res.status(200).json({message:'client deleteted'})
                }else{
                    return res.status(401).json({message:'client deleted failed'})
                }
            })
            .catch(err=>{
                res.send(err)
            })
}
exports.deletfourisseur=(req,res)=>{
    usermodel.findOneAndDelete({$and:[{role:'fournisseur'},{_id:req.params.id}]})
    .exec()
    .then(resultat=>{
      if(resultat){
           return res.status(200).json({message:'fournisseur deleted'})
      }else { 
          return res.status(401).json({message:'fournisseur deleted failed'})
      }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
exports.getuser=(req,res)=>{
 usermodel.findById(req.params.id)
 .exec()
 .then(resultat=>{
     if(resultat){
     resultat.image= "http://localhost:3000/" + resultat.image.split("\\")[0]+ "/"+ resultat.image.split("\\")[1] ;
        return  res.status(200).json(resultat) 
     }else{
         return res.status(404).json({message:'there is no user '})
     }
 })
 .catch(err=>{
     res.status(500).json(err)
 })
}