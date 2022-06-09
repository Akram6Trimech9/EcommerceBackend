const req = require('express/lib/request')
const res = require('express/lib/response')
const mongoose=require('mongoose')
const productModel=require('../models/product')
const subCategory=require('../models/subCategory')

exports.postproduct= async (req,res)=>{
 try{
   const subcat=await subCategory.findOne({_id:req.params.id})
       if(subcat){
            const product=new productModel({
                _id:new mongoose.Types.ObjectId(), 
                titre:req.body.titre,
                description: req.body.description,
                price:req.body.price,
                image:req.file.path,
                dateCreation:req.body.dateCreation,
                subcategory:subcat._id
            })

            product.save()
            .then(async result=>{
                console.log(result)

                 if(result){
                     const subcat=await subCategory.findByIdAndUpdate(req.params.id,{$push:{products:result}})
                      if(subcat){
                     return res.status(200).json(result) }
                     else{
                         res.status(404).json({message:'subcat Failed'})
                     }
                 }
                 else{
                     return res.status(401).json({message:'something went wrong '})
                 }
            })
            .catch(err=>{
                res.status(500).json(err)
            })
       }    
 }catch(err){
     res.status(500).json(err)
 }
}

exports.Getproductbyid=  (req,res)=>{
        productModel.findOne({_id:req.params.id}).populate('comment') 
 
        .then(async result=>{
              if(result){
                               let newnumber= await  result.nbVisiteurs++
                     const product=await productModel.findByIdAndUpdate(result._id,{nbVisiteurs:newnumber}) 
                       if(product){
                           return res.status(200).json(product)
                       }   else{
                           return res.status(401).json({message:'something went wrong '})
                       }
              }
              else { 
                  return res.status(404).json({message:'there is no products '})
              }
         })
         .catch(err=>{
             res.status(500).json(err)
         })    
}

exports.deleteproduct=(req,res)=>{
    productModel.findById(req.params.id)
    .exec()
    .then( async result=>{
              if(result){
                   const subategory = await subCategory.findByIdAndDelete(result.subcategory,{$pull:{products:result}})
                         if(subategory){
                              return res.status(201).json(result)
                         }else{
                             return res.status(400).json({message:'something went wrong '})
                         }
                }else { 
                    return res.status(404).json({message:'not Found '})
                }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
exports.getallproducts= async (req,res)=>{
    try{
     const products = await productModel.find().populate('subcategory')
      products  && products.length>0 &&  res.status(200).json(products)
      products && products.length==0 && res.status(404).json({message:'something went wrong'}) 
    }catch(err){
        res.status(500).json(err)
    }
    }
 exports.GetproductsbyCategory=(req,res)=>{
      productModel.find({subcategory:req.params.id})    
       .exec()
       .then(result=>{
            if(result){
                return  res.status(200).json(result)
            }
            else{
                return res.status(401).json({message:'something went wrong'})
            }
       })
       .catch(err=>{
           res.status(500).json(err)
       })
 }   
 exports.delete=(req,res)=>{
     productModel.findByIdAndDelete(req.params.id)
     .exec()
     .then(resultat=>{
         if(resultat){
             return  res.status(200).json(resultat)
         }else{
              return res.status(404).json({message:'something went wrong'})
         }
     })
     .catch(err=>{
         return res.status(500).json(err)
     })
 }