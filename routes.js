
/* ^^^ EQUIVALENT TO:
	const fsPromise = require('./fs-promise');
	const fileRead = fsPromise.fileRead;
*/

const onRequest = (request, response) => {
	// console.log(request.url, request.method);
	// ^^ same as...
	let {url, method} = request;
	const API_PREFIX = '/api';

	if (url.indexOf(API_PREFIX) === 0) {
		const path = url.slice(API_PREFIX.length);

		// : move this out into own function eventually
		if (path === '/' && method.toUpperCase() === 'GET') {
			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(db.get('cardInfo').value()));
		}
		if (path === '/' && method.toUpperCase() === 'POST') {
			// response.setHeader('Content-Type', 'application/json');
			// response.end(JSON.stringify({data: []}));
			const body = [];
			request

				.on('data', (chunk) => {
					console.log(chunk)
					body.push(chunk);
				})
				.on('end', () => {
					const requestBody = Buffer.concat(body).toString();
					// Add a post
					db.get('cardInfo').push({
						id: Date.now(), 
						data: JSON.parse(requestBody)
					}).write();

					response.setHeader('Content-Type', 'application/json');
					response.end(JSON.stringify(db.get('cardInfo').value()));

				});

			console.log('look ma! im in a post')
		}
		const lastBit = path.split('/').pop();
		const isLastBitNum = !isNaN(lastBit);
		const id = parseInt(lastBit, 10);

		if (path.indexOf('/') === 0 && isLastBitNum && method.toUpperCase() === 'PUT') {
			const body = [];
			request
				.on('data', (chunk) => {
					console.log(chunk)
					body.push(chunk);
				})
				.on('end', () => {
					const requestBody = Buffer.concat(body).toString();
					const dataPayload = JSON.parse(requestBody);
					

					db.get('cardInfo')
					  .find({ id })
					  .set('data.isDone', dataPayload.isDone)
					  // .assign({ isDone: dataPayload.isDone })
					  .write()

					// // Add a post
					// db.get('cardInfo').push({
					// 	id: Date.now(), 
					// 	data: JSON.parse(requestBody)
					// }).write();

					response.setHeader('Content-Type', 'application/json');
					response.end(JSON.stringify(db.get('cardInfo').value()));

				});
		}

		if (path.indexOf('/') === 0 && isLastBitNum && method.toUpperCase() === 'DELETE') {
			console.log('me');

			db.get('cardInfo')
			  .remove({ id })
			  .write()


			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify(db.get('cardInfo').value()));
		}
	}
	else {
		if (url === '/') {
			url = '/index.html';
		}

		const pathToFile = './public' + url;
		// const pathToFile = './public' + (url === '/' ? '/index.html' : url);
		// ^^^ opposite approach, less verbose but harder to read

		fileRead(pathToFile)
			.then((data) => {
				response.end(data);
			})
			.catch((e) => {
				response.statusCode = 404;
				response.end('Kitten not found...?')
			});
	}

	
}


module.exports = onRequest;






