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

var ip_addr = '0.0.0.0';
var port = '8081';

var server = restify.createServer({
		name : "world"
	});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());

var PATH = '/users'
	server.get({
		path : PATH,
		version : '0.0.1'
	}, findActiveUsers);
server.get({
	path : PATH + '/deleted',
	version : '0.0.1'
}, findDeletedUsers);
server.get({
	path : PATH + '/updated/:timestamp',
	version : '0.0.1'
}, findUpdatedUsers);
server.get({
	path : PATH + '/:tid',
	version : '0.0.1'
}, findUser);
server.post({
	path : PATH,
	version : '0.0.1'
}, addUser);
server.del({
	path : PATH + '/:tid',
	version : '0.0.1'
}, deleteUser);
server.put({
	path : PATH + '/:tid',
	version : '0.0.1'
}, updateUser);

function findActiveUsers(req, res, next) {
	return findUsers(req, res, 'Y', next);
}

function findDeletedUsers(req, res, next) {
	return findUsers(req, res, 'N', next);
}

function findUpdatedUsers(req, res, next) {
	console.log("findUpdatedUsers");
	console.log(req.params);
	return findUsers(req, res, 'Y', next);
}

function findUsers(req, res, deleted, next) {
	console.log("findAllUsers " + deleted);
	console.log(req.params);
	//console.log(req.headers);
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * FROM users WHERE is_active = ?', [deleted], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, {
			users : rows
		});
	});
	return next();
}

function findUser(req, res, next) {
	console.log("findUsers " + req.params.tid);
	//console.log(req.headers);
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * FROM users WHERE tid = ?', [req.params.tid], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, rows);
	});
	return next();
}

function addUser(req, res, next) {
	console.log("addNewUser");
	console.log(req.headers);
	var user = {};
	if (req.params.tid === undefined) {
		console.log("tid Undefined");
	}
	user.tid = req.params.tid;
	user.first_name = req.params.first_name;
	user.last_name = req.params.last_name;
	user.mail_id = req.params.mail_id;
	user.extension = req.params.extension;
	user.created_by = 'T8020JC';
	user.created_on = new Date();
	user.updated_on = new Date();
	user.updated_by = 'T8020JC';
	user.is_active = 'Y';
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query("INSERT INTO users set ?", [user], function (err, rows) {
		if (err)
			console.log("Error inserting : %s ", err);
		console.log("Inserted User with Id " + req.params.tid);
		res.json(200, {
			tid : req.params.tid
		});
	});
	return next();
}

function updateUser(req, res, next) {

	var user = {};
	user.tid = req.params.tid;
	user.first_name = req.params.first_name;
	user.last_name = req.params.last_name;
	user.mail_id = req.params.mail_id;
	user.extension = req.params.extension;
	user.updated_on = new Date();
	user.updated_by = 'T8020JC';
	user.is_active = 'Y';
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query("UPDATE users set ? WHERE tid = ?", [user, req.params.tid], function (err, rows) {
		if (err)
			console.log("Error updating : %s ", err);
		res.json(200, {
			tid : req.params.tid
		});
	});
	return next();
}
function deleteUser(req, res, next) {
	console.log("deleteUser " + req.params.tid);
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("Delete users " + req.params.tid);
	connection.query("UPDATE users set is_active = ? WHERE tid = ?", ['N', req.params.tid], function (err, rows) {
		if (err)
			console.log("Error updating : %s ", err);
		res.json(200, {
			tid : req.params.tid
		});
	});
	return next();
}

var VEH_PATH = '/vehicles'
	server.get({
		path : VEH_PATH,
		version : '0.0.1'
	}, findActiveVehicles);
server.get({
	path : VEH_PATH + '/deleted',
	version : '0.0.1'
}, findDeletedVehicles);
server.get({
	path : VEH_PATH + '/updated/:timestamp',
	version : '0.0.1'
}, findUpdatedVehicles);
server.get({
	path : VEH_PATH + '/:vehicle_number',
	version : '0.0.1'
}, findVehicle);
server.post({
	path : VEH_PATH,
	version : '0.0.1'
}, addVehicle);
server.del({
	path : VEH_PATH + '/:vehicle_number',
	version : '0.0.1'
}, deleteVehicle);
server.put({
	path : VEH_PATH + '/:vehicle_number',
	version : '0.0.1'
}, updateVehicle);

function findActiveVehicles(req, res, next) {
	return findVehicles(req, res, 'Y', next);
}

function findDeletedVehicles(req, res, next) {
	return findVehicles(req, res, 'N', next);
}

function findUpdatedVehicles(req, res, next) {
	console.log("findUpdatedVehicles");
	console.log(req.params);
	return findVehicles(req, res, 'Y', next);
}

function findVehicles(req, res, deleted, next) {
	console.log("findAllVehicles " + deleted);
	console.log(req.params);
	//console.log(req.headers);
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * FROM vehicles WHERE is_active = ?', [deleted], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, {
			vehicles : rows
		});
	});
	return next();
}

function findVehicle(req, res, next) {
	console.log("findVehicle " + req.params.vehicle_number);
	//console.log(req.headers);
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * FROM vehicles WHERE vehicle_number = ?', [req.params.vehicle_number], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, rows);
	});
	return next();
}

function addVehicle(req, res, next) {
	console.log("addNew Vehicle");
	console.log(req.headers);
	var vehicle = {};
	if (req.params.vehicle_number === undefined) {
		console.log("vehicle_number Undefined");
	}
	// user.tid = req.params.tid;
	// user.first_name = req.params.first_name;
	// user.last_name =req.params.last_name;
	// user.mail_id=req.params.mail_id;
	// user.extension=req.params.extension;
	// user.created_by='T8020JC';
	// user.created_on=new Date();
	// user.updated_on=new Date();
	// user.is_active='Y';
	vehicle.vehicle_number = req.params.vehicle_number;
	vehicle.engine = req.params.engine;
	vehicle.model = req.params.model;
	vehicle.year = req.params.year;
	vehicle.created_by = 'T8020JC';
	vehicle.created_on = new Date();
	vehicle.updated_by = 'T8020JC';
	vehicle.updated_on = new Date();
	vehicle.is_active = 'Y';
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query("INSERT INTO vehicles set ?", [vehicle], function (err, rows) {
		if (err)
			console.log("Error inserting : %s ", err);
		console.log("Inserted vehicle with Id " + req.params.vehicle_number);
		res.json(200, {
			vehicle_number : req.params.vehicle_number
		});
	});
	return next();
}

function updateVehicle(req, res, next) {

	var vehicle = {};
	vehicle.vehicle_number = req.params.vehicle_number;
	vehicle.engine = req.params.engine;
	vehicle.model = req.params.model;
	vehicle.year = req.params.year;
	vehicle.updated_by = 'T8020JC';
	vehicle.updated_on = new Date();
	vehicle.is_active = 'Y';
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query("UPDATE vehicles set ? WHERE tid = ?", [vehicle, req.params.vehicle_number], function (err, rows) {
		if (err)
			console.log("Error updating : %s ", err);
		res.json(200, {
			vehicle_number : req.params.vehicle_number
		});
	});
	return next();
}
function deleteVehicle(req, res, next) {
	console.log("deletevehicle " + req.params.tid);
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("Delete users " + req.params.tid);
	connection.query("UPDATE vehicles set is_active = ? WHERE vehicle_number = ?", ['N', req.params.vehicle_number], function (err, rows) {
		if (err)
			console.log("Error updating : %s ", err);
		res.json(200, {
			vehicle_number : req.params.vehicle_number
		});
	});
	return next();
}

var SPECIAL_INSTRUCTIONS_PATH = '/special_instructions'
	server.get({
		path : SPECIAL_INSTRUCTIONS_PATH,
		version : '0.0.1'
	}, findActiveInstructions);
server.get({
	path : SPECIAL_INSTRUCTIONS_PATH + '/deleted',
	version : '0.0.1'
}, findDeletedInstructions);
server.get({
	path : SPECIAL_INSTRUCTIONS_PATH + '/updated/:timestamp',
	version : '0.0.1'
}, findUpdatedInstructions);
server.get({
	path : SPECIAL_INSTRUCTIONS_PATH + '/:vehicle_number',
	version : '0.0.1'
}, findInstruction);
server.post({
	path : SPECIAL_INSTRUCTIONS_PATH,
	version : '0.0.1'
}, addInstruction);
server.del({
	path : SPECIAL_INSTRUCTIONS_PATH + '/:vehicle_number',
	version : '0.0.1'
}, deleteInstruction);
server.put({
	path : SPECIAL_INSTRUCTIONS_PATH + '/:vehicle_number',
	version : '0.0.1'
}, updateInstruction);

function findActiveInstructions(req, res, next) {
	return findInstructions(req, res, 'Y', next);
}

function findDeletedInstructions(req, res, next) {
	return findInstructions(req, res, 'N', next);
}

function findUpdatedInstructions(req, res, next) {
	console.log("findUpdatedInstructions");
	console.log(req.params);
	return findInstructions(req, res, 'Y', next);
}

function findInstructions(req, res, deleted, next) {
	console.log("findAllInstructions " + deleted);
	console.log(req.params);
	//console.log(req.headers);
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * FROM special_instructions WHERE is_active = ?', [deleted], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, {
			special_instructions : rows
		});
	});
	return next();
}

function findInstruction(req, res, next) {
	console.log("findInstruction " + req.params.id);
	//console.log(req.headers);
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query('SELECT * FROM special_instructions WHERE id = ?', [req.params.id], function (err, rows, fields) {
		if (err)
			throw err;
		res.json(200, rows);
	});
	return next();
}

function addInstruction(req, res, next) {
	console.log("addNew Instruction");
	console.log(req.headers);
	var instruction = {};

	instruction.instructions = req.params.instructions;
	instruction.engineer_tid = req.params.engineer_tid;
	instruction.created_by = 'T8020JC';
	instruction.updated_by = 'T8020JC';
	instruction.updated_on = new Date();
	instruction.created_on = new Date();
	instruction.is_active = 'Y';
	instruction.vehicle_number = req.params.vehicle_number;

	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query("INSERT INTO special_instructions set ?", [instruction], function (err, rows) {
		if (err)
			console.log("Error inserting : %s ", err);
		console.log("Inserted vehicle with Id " + rows.insertId);
		res.json(200, {
			id : rows.insertId
		});
	});
	return next();
}

function updateInstruction(req, res, next) {
	var instruction = {};

	instruction.id = req.params.id;
	instruction.instructions = req.params.instructions;
	instruction.engineer_tid = req.params.engineer_tid;
	instruction.created_by = 'T8020JC';
	instruction.updated_by = 'T8020JC';
	instruction.updated_on = new Date();
	instruction.is_active = 'Y';
	instruction.vehicle_number = req.params.vehicle_number;
	res.setHeader('Access-Control-Allow-Origin', '*');
	connection.query("UPDATE special_instructions set ? WHERE id = ?", [instruction, req.params.id], function (err, rows) {
		if (err)
			console.log("Error updating : %s ", err);
		res.json(200, {
			id : req.params.id
		});
	});
	return next();
}
function deleteInstruction(req, res, next) {
	console.log("deleteInstruction " + req.params.id);
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("Delete instruction " + req.params.id);
	connection.query("UPDATE special_instructions set is_active = ? WHERE id = ?", ['N', req.params.id], function (err, rows) {
		if (err)
			console.log("Error updating : %s ", err);
		res.json(200, {
			id : req.params.id
		});
	});
	return next();
}

server.listen(port, ip_addr, function () {
	console.log('%s listening at %s ', server.name, server.url);
});
