const http = require('http');
const port = 9999;

const onRequest = require('./routes');

const server = http.createServer(onRequest);

server.listen(port, (err) => {
	if (err) {
		console.log('ERROR: ', err)
	}

	console.log('server started at http://localhost:' + port)
});