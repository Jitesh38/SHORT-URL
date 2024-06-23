const express = require('express')
const User = require('../models/url')
const router = express.Router();

router.get('/',async(req,res)=>{
    allurls = await User.find({})
    return res.render('home',{
        allurls:allurls
    })
})

module.exports = router;
