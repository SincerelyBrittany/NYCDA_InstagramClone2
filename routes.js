const express = require('express');
const router = express.Router();
const db = require('sqlite');
const DB_NAME = './database.sqlite';
const DB = require ('./DB.js');

// const storage = require('./firebase.js');

const parser = require('body-parser');

router.use(parser.json());

router.post('/posts', (request, response) => {
     console.log("We made it", request.body)
	const args = request.body;

	return db.run(`INSERT into Posts (post_id, user_id, photolink, caption, date_time) VALUES ('${args.postId}', '${args.userId}','${args.photo}','${args.caption}');`)
		.then(() => {
			response.send({success: true})
		})
		.catch((e) => {
			console.log(e)
		})
});

router.get('/instagram', (request, response) => {
     console.log("We made it", request.body)
	const args = request.body;

	
		db.all('SELECT * FROM Posts')
    			.then(v => {
     				 // console.log(v)
     			 return response.send(v)
    				})
		.catch((v) => {
			console.log(v)
		})
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
