var restify = require('restify');
var mysql = require('mysql');
var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'root',
		database : "world"
	});

connection.connect(function (err) {
	console.log("Connected to mysql server.. listening on 3306");
});

var server = restify.createServer({
		name : "nodeMysqlServer"
	});

var ip_addr = '0.0.0.0';
var port = '8080';

var PATH = '/city'

	server.get({
		path : PATH,
		version : '0.0.1'
	}, findCities);
server.get({
	path : PATH + '/:name',
	version : '0.0.1'
}, findCitiesWithName);
function findCities(req, res, next) {

	connection.query('SELECT * FROM city  ', function (err, rows, fields) {
		if (err)
			throw err;
		console.log("hi alive");
		var k = {};
		k.key = rows;
		res.json(200, k);
	});

}

function findCitiesWithName(req, res, next) {

	connection.query('SELECT * FROM city WHERE Name=?', [req.params.name], function (err, rows, fields) {
		if (err)
			throw err;
		//res.write(rows);
		console.log("one city" + req.params.name);
		console.log(JSON.stringify(rows));
		res.json(200, rows);

	});

}

var PATH = '/countrylanguage'
	server.get({
		path : PATH,
		version : '0.0.1'
	}, findCountryLanguage);

function findCountryLanguage(req, res, next) {

	connection.query('SELECT * FROM countrylanguage', function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, rows);
	});

}


server.post({path : PATH , version: '0.0.1'} ,addCity);

function addCity(req,res,next){
	
	ID = req.params.ID;
	Name =req.params.Name;
	District = req.params.District;
	Population = req.params.Population;
	CountryCode = req.params.CountryCode;
	
	
	connection.query('INSERT INTO CITY VALUES(?,?,?,?,?)',ID,Name,District,Population,CountryCode ,function(err, rows) {
        if (err)
           console.log("Error inserting : %s ",err );
		console.log("Inserted User with Id " +req.params.Name);
		res.json(200, {tid: req.params.tid});
	});
	return next();
	
}


var PATH = server.use(restify.queryParser());

server.listen(port, ip_addr, function () {
	console.log('%s listening at %s ', server.name, server.url);
});