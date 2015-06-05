var restify = require('restify');
var mysql = require('mysql');

var connection = mysql.createConnection({

		host : 'localhost',
		user : 'root',
		password : 'root',
		database : "testnode"



});


connection.connect(function (err){

console.log("connection error");


});

var server = restify.createServer({

name: "postServer"

});

var ip_addr = '0.0.0.0';
var port = '8080';

var PATH = '/data'

	server.post({
		path : PATH,
		version : '0.0.1'
	}, showPath);
	
	function showPath(req,res,next){
	
	connection.query('SELECT * FROM testPost', function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, rows);
	});
	
	
	}
	
	
	function addPath(req,res,next){
	
	var id = req.params.ID;
	var name = req.params.NAME;
	connection.query('INSERT INTO testPost VALUES(?,?)',[id],[name], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, rows);
	});
	
	
	}
	
	
	
	server.listen(port, ip_addr, function () {
	console.log('%s listening at %s ', server.name, server.url);
});



