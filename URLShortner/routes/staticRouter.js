const express = require("express");
const router = express.Router();
const URL = require('../models/url');

router.get('/', async (req, res) => {
    if(!req.user) {
        console.log('no user find in staticRouter');
        return res.redirect('/user/login')
}

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
