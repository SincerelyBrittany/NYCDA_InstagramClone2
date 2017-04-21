(function() { // protect the lemmings

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};
			request.send();
		});
	} // GET

	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function DELETE(url, data = {}) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('DELETE', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // DELETE


//Login
	const loginUsernameField = document.querySelector('.js-username-input-login')
	const loginPasswordField = document.querySelector('.js-password-input-login')
    const loginEmailField = document.querySelector('.js-email-input-login')
    const loginButton = document.querySelector('.js-login-button')

    //Sign-Up
    const signupUsernameField = document.querySelector('.js-username-input-signup')
    const signupPasswordField = document.querySelector('.js-password-input-signup')
    const signupEmailField = document.querySelector('.js-email-input-signup')
    const signupButton = document.querySelector('.js-button-signup')

   //LOGIN POST
loginButton.addEventListener('click',(e) => {
	e.preventDefault();
	POST('/api/login', {
		loginUsernameField:loginUsernameField.value,
		loginPasswordField:loginPasswordField.value,
		loginEmailField:loginEmailField.value
	})
})

signupButton.addEventListener('click',(e) => {
	e.preventDefault();
	POST('/api/signup', {
		signupUsernameField:signupUsernameField.value,
		signupPasswordField:signupPasswordField.value,
		signupEmailField:signupEmailField.value
	})
})



})();







