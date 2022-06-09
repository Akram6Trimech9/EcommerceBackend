const mongoose=require('mongoose')
 const CommentModel=require('../models/comments')
const productModel=require('../models/product')
exports.PostComment=(req,res)=>{
   const Comment = new CommentModel({
    _id:new mongoose.Types.ObjectId(),
    description: req.body.description,
       email: req.body.email,
       rating:req.body.rating,
       product: req.params.id
   })
   Comment.save()
    .then( async comment=>{
         if(comment){
                 const product=await productModel.findByIdAndUpdate(req.params.id,{$push:{comment:comment}})
                       if(product){
                           return res.status(200).json({product})
                       }else{
                           return res.status(404).json({message:"something went wrong"})
                       }
                }
            else{        
                return res.status(401).json({message:"something went wrong"})
            }

   })
   .catch(err=>{
       console.log(err)
       return res.status(500).json(err)
   })
}
exports.getAllcomments=(req,res)=>{
    CommentModel.find()
    .exec()
    .then(comment=>{
        if(comment){
            return res.status(201).json(comment)
        }else{
            return res.status(404).json({message:'something went wrong'})
        }
    })
    .catch(err=>{
        return res.status(500).json(err)
    })
}
exports.getcommentByid= (req,res)=>{
CommentModel.find({product:req.params.id})
.then(resultat=>{
    if(resultat){
        return res.status(200).json(resultat)
    }else{
        return res.status(404).json({message:'something went wrong '})
    }
})
.catch(err=>{
    return res.status(500).json(err)
}) 

}
