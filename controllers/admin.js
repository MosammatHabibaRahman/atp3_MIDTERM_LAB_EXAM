var express = require('express');
//var adminModel = require.main.require('./models/adminModel');
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
	console.log(req.session.aid);
    res.render('admin/index');
});

router.get('/addEmployee',function (req,res){
    res.render('admin/addEmployee');
});

router.post('/addEmployee',function (req,res){
    if(req.body.cancel)
    {
        res.redirect('/admin');
    }
    else
    {
        res.send('Submitted!');
    }
});

router.get('/empList',function (req,res){
    res.render('admin/empList');
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