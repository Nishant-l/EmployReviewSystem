const { application } = require('express');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('passed Authentencation of Admin')
})

module.exports = router;