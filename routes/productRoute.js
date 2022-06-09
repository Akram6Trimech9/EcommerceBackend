 const router=require('express').Router()
 const productController=require('../controllers/ProductController')
 const multer=require('../utils/config/multer')

router.post('/post/:id',multer.single('image'),productController.postproduct)
router.delete('/:id',productController.deleteproduct)
router.get('/:id',productController.Getproductbyid)
router.get('/',productController.getallproducts)

module.exports=router

