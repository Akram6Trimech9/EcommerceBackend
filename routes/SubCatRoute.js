const router=require('express').Router()
const subcategoryController=require('../controllers/SubCategoryController')
router.post('/add/:id',subcategoryController.postsub)
router.get('/',subcategoryController.getsubCatgories)
router.get('/:id',subcategoryController.getsubCatgoryByid)
router.patch('/:id',subcategoryController.updatesubCategory)
router.delete('/:id',subcategoryController.deletesub)
module.exports=router ; 