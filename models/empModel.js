var db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from employee where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	insert: function(user, callback){
		var sql = "insert into employee values(?, ?, ?, ?, ?)";

		db.execute(sql, ['', user.name, user.phone, user.username,user.password], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	get: function(id, callback){
		var sql = "select * from employee where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from employee";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	update: function(user, callback){
		var sql = "update employee set name=?, phone=?, username=?, password=? where id=?";
		db.execute(sql, [user.name, user.phone, user.username, user.password, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from employee where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}