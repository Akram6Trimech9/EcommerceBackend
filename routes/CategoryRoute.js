const router=require("express").Router()
const categoryController=require('../controllers/CategoryController')
const multer=require('../utils/config/multer')
router.post('/',multer.single('image'),categoryController.postCategory)
router.get('/',categoryController.getallCategories)
router.get('/:id',categoryController.getCategorybyid)
router.patch('/:id',multer.single('image'),categoryController.updateCategory)
router.delete('/:id',categoryController.deleteCategory)
module.exports=router ; 