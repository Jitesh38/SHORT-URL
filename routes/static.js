const express = require('express')
const User = require('../models/url')
const router = express.Router();

router.get('/',async(req,res)=>{
    if(!req.user) return res.redirect('/login')
    allurls = await User.find({ createdBy : req.user._id })
    return res.render('home',{
        allurls:allurls
    })
})

router.get('/signup',async(req,res)=>{
    return res.render('signup')
})

router.get('/login',async(req,res)=>{
    return res.render('login')
})

module.exports = router;
