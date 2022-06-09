const router=require('express').Router()
const CommentControllers=require('../controllers/commentsController')

router.post('/:id',CommentControllers.PostComment)
router.get('/:id',CommentControllers.getcommentByid)
router.get('/',CommentControllers.getAllcomments)
module.exports=router;