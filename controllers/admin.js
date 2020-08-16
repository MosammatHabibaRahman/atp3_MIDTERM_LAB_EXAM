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
			res.send("Something went wrong! <a href="+"/admin"+">Back</a>");
		}
	});
});

router.get('/update/:id',function (req,res){
    var id = req.params.id;
	console.log(id);
	empModel.get(id, function(result){
		if(result)
		{
			res.render('admin/update',{info: result});
		}
		else
		{
			res.send("Something went wrong! <a href="+"/admin/viewEmployees"+">Back</a>");
		}
	});});

router.get('/delete/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	empModel.get(id, function(result){
		if(result)
		{
			res.render('admin/delete',{info: result});
		}
		else
		{
			res.send("Something went wrong! <a href="+"/admin/viewEmployees"+">Back</a>");
		}
	});
});

router.post('/delete/:id', function(req, res){
	var id = req.params.id;
	if(req.body.no)
	{
		res.redirect('/admin/viewEmployees');
	}
	else
	{
		empModel.delete(id, function(status){
			console.log(status);
			if(status)
			{
				res.redirect('/admin/viewEmployees');
			}
			else
			{
				res.send("Something went wrong! <a href="+"/admin/viewEmployees"+">Back</a>");
			}
		});
	}
});

module.exports = router;