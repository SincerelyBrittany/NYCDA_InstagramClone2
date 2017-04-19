const express = require('express');
const router = express.Router();

const storage = require('./firebase.js');

const parser = require('body-parser');

router.use(parser.json());

router.get('/login', (request, response) => {

     next();
});

router.post('/login', (request, response) => {
     
});

router.post('/signup', (request, response) => {
     
});


module.exports = router;