const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send(req.user)
})

router.get('/show',(req,res)=>{
    res.send('hollaa')
})

module.exports = router;