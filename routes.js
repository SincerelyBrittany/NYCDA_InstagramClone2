const express = require('express');
const router = express.Router();
const db = require('sqlite');
const DB_NAME = './database.sqlite';
const DB = require ('./DB.js');

// const storage = require('./firebase.js');

const parser = require('body-parser');

router.use(parser.json());

router.post('/instagram', (request, response) => {
     console.log("We made it", request.body)

	response.header('Content-Type', 'application/json');
	response.send({
	    "message": "Hello, Wrold!",
	    "success": true
	});
});

router.post('/signup', (request, response) => {
	console.log("I made it here")
	console.log("here are the goods",request.body);
	const args = request.body;

	// console.log(`INSERT INTO Users (username, email, password) VALUES (${args.Username}, ${args.Email}, ${args.Pass});`)
	// console.log(`INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY) VALUES (1, 'Paul', 32, 'California', 20000.00 );`)

	return db.run(`INSERT into Users (username, email, password) VALUES ('${args.Username}', '${args.Email}','${args.Pass}');`)
	// return db.run(`INSERT INTO Users (username, email, password) VALUES (${args.Username}, ${args.Email}, ${args.Pass});`)
		.then(() => {
			response.send({success: true})
		})
		.catch((e) => {
			console.log(e)
		})
     
});

module.exports = router;