var express = require('express');
var adminModel = require('../models/adminModel');
var empModel = require('../models/empModel');
var router = express.Router();

router.get('*',function (req,res,next){
	if(!req.session.aid)
	{
		res.redirect('/login');
	}
	else
	{
		next();
	}
});

router.get('/',function (req,res){
    res.render('admin/index');
});

router.get('/addEmployee',function (req,res){
    res.render('admin/addEmployee');
});

router.post('/addEmployee',function (req,res){

	var emp = {
		name: req.body.name,
		phone: req.body.phone,
		username: req.body.username,
		password: req.body.password
	};

	console.log(emp);
	if(req.body.cancel)
    {
        res.redirect('/admin');
    }
	else
	{
		if(emp.name=="" || emp.phone=="" || emp.username=="" || emp.password=="")
		{
			res.send("Fields cannot be empty! <a href="+"/admin/addEmployee"+">Please Try Again</a>");
		}
		else
		{
			empModel.insert(emp,function(status){
				console.log(status);
				if(status)
				{
					res.redirect('/login');
				}
				else
				{
					res.send("Something went wrong! <a href="+"/admin/addEmployee"+">Try Again</a>");
				}
			});
		}
	}
});

router.get('/viewEmployees',function (req,res){
	
	empModel.getAll(function(result){
		console.log(result);
		if(result.length > 0)
		{
			res.render('admin/viewEmployees',{list: result});
		}
		else
		{
			res.render('admin/viewEmployees',{list: null});
		}
	});
});

router.get('/update',function (req,res){
    res.render('admin/update');
});

router.get('/delete',function (req,res){
    res.render('admin/delete');
});

router.get('/logout',function (req,res){
    res.redirect('login');
});

module.exports = router;