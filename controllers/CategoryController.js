const mongoose=require('mongoose')
const categoryModel=require('../models/Category')
const subCategoryModel=require('../models/subCategory')
const productModel=require('../models/product')
exports.postCategory=(req,res)=>{
    try{
        const category=new categoryModel({
            _id:new mongoose.Types.ObjectId(),
            nomCategory:req.body.nomCategory,
            image:req.file.path
        })
        category.save()
        .then(result=>{
            if(result){
               return  res.status(201).json({message:'category created',category})
            }else{
                 return res.status(400).json({message:'somthing went wrong'})
            }
        })
        .catch(err=>{
            return res.status(500).json(err)
        })
     }catch(err){
res.status(500).json(err)
    }
}
exports.updateCategory=(req,res)=>{
    categoryModel.findByIdAndUpdate(req.params.id,{$set:{nomCategory:req.body.nomCategory ,
        image:req.file.path
    }}) 
      .exec()
   .then( category=>{
  if(category){
                 return     res.status(200).json({message:'updated',category})
     }else{
                 return    res.status(401).json({message:'there is an error'})
                 }
    })
   .catch(err=>{
       console.log(err)
      return res.status(500).json(err)
   }) }
exports.getCategorybyid=async (req,res)=>{
 try{
    const category= await categoryModel.findOne({_id:req.params.id})
     if(category){
         res.status(201).json(category)
     }else{
         res.status(401).json({message:'something went wrong'})
     }
 } catch(err){
     res.status(500).json(err)
 }
}
exports.getallCategories=(req,res)=>{
     categoryModel.find()
     .exec()
     .then(resultat=>{
         if(resultat){
             res.status(201).json(resultat)
         }else{
             res.status(404).json({message:'there is no categories '})
         }
     }).catch(err=>{
         res.send(err)
     })
}
exports.deleteCategory=(req,res)=>{
    categoryModel.findById(req.params.id)
      .exec()
      .then( async  result =>{
            if(result){
                console.log(result)

                 const subcategoryid=await subCategoryModel.findOne({Category:result._id})
                  const subCategory=await subCategoryModel.deleteMany({Category:result._id})
                  const product=await productModel.deleteMany({subcategory:subcategoryid})
                   if(subcategoryid && subCategory && product){
                          const category = await categoryModel.findByIdAndDelete(req.params.id)
                                if(category){
                                     return res.status(200).json({message:'category deleted succe'})
                                }  else{
                                    res.status(401).json({message:'something went wrong'})
                                }
                        }
                        else{
                            res.status(401).json({message:'something went wrong'})
                        }
            }
      } 
      )
      .catch(err=>{
        console.log('err',err)

          res.status(500).json(err)
    })
}