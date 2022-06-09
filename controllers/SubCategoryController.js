const mongoose=require('mongoose')
const SubCatModel=require('../models/subCategory')
const Category=require('../models/Category') 
exports.postsub=(req,res)=>{
    const subcat=new SubCatModel({
        _id:new mongoose.Types.ObjectId(),
        nomsubCategory:req.body.nomsubCategory

    })
    subcat.save()
    .then( async result=>{
       if(result){
          const category= await Category.findByIdAndUpdate(req.params.id,{$push:{subCategory:result}})
          const subcategory=await SubCatModel.findByIdAndUpdate(result._id,{Category:req.params.id})
            if(category && subcategory){
                 return res.status(201).json({message:'subcategoryAdded',result})
            } else { 
                return res.status(401).json({message:'there is an error'})
            }
        }
        else { 
            res.status(400).json({message:'check your attributes'})
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
exports.getsubCatgoryByid=(req,res)=>{
    SubCatModel.findOne({_id:req.params.id})
    .populate('products')
    .exec()
    .then(result=>{
        if(result){
            return res.status(201).json(result)

        }else{
            return res.status(401).json({message:'something went wrong'})
        }
    })
    .catch(err=>{
        return res.status(500).json(err)
    })
}
exports.getsubCatgories=(req,res)=>{
    SubCatModel.find()
    .populate('Category')
     .exec()
     .then(result=>{
          if(result){
              return res.status(200).json(result)
          }
          else { 
              return res.status(401).json({message:'something went wrong '})
          }
     })
     .catch(err=>{
         res.status(500).json(err)
     })
}
exports.updatesubCategory=async(req,res)=>{
    try{
 const subcategory=await SubCatModel.findById(req.params.id)
 if(subcategory){
     Object.keys(req.body).forEach(element=>{
        subcategory[element]=req.body[element];
     })
     subcategory.save()
     .then(subategory_updated=>{
        subategory_updated && res.status(200).json(subategory_updated);
        subategory_updated && res.status(400).json({message:'something went wrong'})
     }).catch(err=>{
         res.status(500).json(err)
     })

 }else{
   return res.status(404).json({message:'subategory not found'});

 }
    }catch(err){

    }
}
exports.deletesub=(req,res)=>{
     SubCatModel.findByIdAndDelete(req.params.id)
    .exec()
    .then( async result=>{
        if(result){
            const  category = await Category.findOneAndUpdate({subCategory:result._id},{$pull:{subCategory:result._id}})
              if(category){
            return res.status(200).json({message:'deleted succ '})
        }
        } else {
            return res.status(401).json({message:'failed'})
        }
    })
    .catch(err=>{
        return res.status(500).json(err)
    })
    }