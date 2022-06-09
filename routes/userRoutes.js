const router=require("express").Router()
const userController=require('../controllers/UsersController')
const multer=require('../utils/config/multer')
router.post('/signup',multer.single('image'),userController.signup); 
 router.post('/login',userController.login)
router.get('/getclients',userController.getallclients)
router.get('/getfournisseur',userController.getallfournisseur)
router.get('/',userController.getbothof)
router.get('/getuser/:id',userController.getuser)
router.patch('/updateClient',userController.updateClient)
router.patch('/updatefournisseur',userController.updatefournisseur)
router.delete('/deleteclient/:id',userController.deleteClient)
module.exports=router ; 