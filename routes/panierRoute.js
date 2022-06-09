const router=require('express').Router()
const panierController=require('../controllers/panierController')
router.get('/:id',panierController.getPanierByid)
router.post('/post',panierController.PostPanier)
router.delete('/:id',panierController.deletPanier)
module.exports=router