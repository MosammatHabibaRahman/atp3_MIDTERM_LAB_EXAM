var express = require('express');
var adminModel = require.main.require('./models/adminModel');
var router = express.Router();

router.get('/',function (req,res){
	
    req.session.aid = "";
	res.redirect('/login');
});

module.exports = router;