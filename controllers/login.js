var express = require('express');
var adminModel = require('../models/adminModel');
var router = express.Router();

router.get('/',function (req,res){
    res.render('login/index');
});

router.post('/',function (req,res){
    admin = {
        username: req.body.username,
        password: req.body.password
    };
	
	adminModel.validate(admin,function(result){
		if(result)
		{
			req.session.aid = result.id;
			res.redirect('/admin');
		}
		else
		{
			res.send("Invalid username or password. <a href="+"/admin"+">Try Again</a>");
		}
	});
});

module.exports = router;