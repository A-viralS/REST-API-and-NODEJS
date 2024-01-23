const express= require('express');
const {handleUserSignup,handleUserLogin}=require('../controllers/user')
const router=express.Router();


router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get('/login',(req,res)=>{
    return res.render ('login')
})
router.post('/login',handleUserLogin)
router.post('/signup',handleUserSignup)
module.exports=router;