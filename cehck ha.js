var request = require("request");
var jar = request.jar();
var cookie = request.cookie("count=1");
jar.add(cookie);
request({
	url : "http://localhost:8000/",
	jar : jar
}, function (error, response, body) {
	console.log(jar);
});
