const express = require('express');
const router = express.Router();

// const storage = require('./firebase.js');

const parser = require('body-parser');

router.use(parser.json());

router.get('/login', (request, response) => {

     next();
});

router.post('/login', (request, response) => {
     
});

router.post('/instagram', (request, response) => {
     console.log("We made it", request.body)

	response.header('Content-Type', 'application/json');
	response.send({
	    "message": "Hello, Wrold!",
	    "success": true
	});
});

router.post('/signup', (request, response) => {
     
});

module.exports = router;