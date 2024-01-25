const express = require("express");
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require("../middlewares/auth");


router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res)=>{
    const allURLs=await URL.find({});
    return res.render('home',{
        urls:allURLs,
    })
})

router.get('/', restrictTo(['NORMAL','ADMIN']),async (req, res) => {
//     if(!req.user) {
//         console.log('no user find in staticRouter');
//         return res.redirect('/user/login')
// }//THIS REMOVED AFTER CHECKFORAUTHENTICATION FUCNTION 

    try {
        const allURLs = await URL.find({createdBy:req.user._id});
        console.log('ALL URLS',allURLs);
        return res.render('home', {
            urls: allURLs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});
router.get('/signup',(req,res)=>{
    res.render('signup');
})

module.exports = router;
