


var d={};
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'world'
});

connection.connect();

connection.query('SELECT * from city', function(err, rows, fields) {
  if (!err){
	   d = JSON.stringify(rows);
	 var http = require("http");
function onRequest(request, response) {
	console.log("Request received.");
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	response.write(d);
	//response.write("Hello World" + d );
	
	response.end();
}
http.createServer(onRequest).listen(8080);
console.log("Server has started.");
console.log(d);

	 
  
    console.log('The solution is: ', rows);
  }
  else
    console.log('Error while performing Query.');
});

connection.end();


/* 
var http = require("http");

http.createServer(function(request, response) {
response.writeHead(200, {"Content-Type": "text/plain"});
response.write("Hello World");
//response.write(d);
response.end();
}).listen(8080); */