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


//LOGIN POST
const loginButton = document.querySelector('.js-login-button');
    if(loginButton !== null) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
	const loginUsernameField = document.querySelector('.js-username-input-login')
	const loginPasswordField = document.querySelector('.js-password-input-login')
    const loginEmailField = document.querySelector('.js-email-input-login')

            if (!loginUsernameField.value || !loginPasswordField.value || !loginEmailField.value) {
                alert('need name and password and email');
                return;
            }
            console.log(loginEmailField, loginPasswordField, loginUsernameField)

            POST('/api/login', {
                // loginUsernameField,
                loginEmailField,
                loginPasswordField,
            }).then((data) => {
                console.log(data) 
                if (data) {
                    window.location.href="/feed.html"
                    //    window.location="/feed.html"

                }
            });
        });
    }


const signupButton = document.querySelector('.js-button-signup');
console.log(signupButton)
    if(signupButton !== null) {
        signupButton.addEventListener('click', (e) => {

            e.preventDefault();
	const signupUsernameField = document.querySelector('.js-username-input-signup')
    const signupPasswordField = document.querySelector('.js-password-input-signup')
    const signupEmailField = document.querySelector('.js-email-input-signup')
    		
            if (!signupUsernameField.value || !signupPasswordField.value || !signupEmailField.value) {
                alert('need name and password and email');
                return;
            }
            POST('/api/signup', {
                Username: signupUsernameField.value,
                Email: signupEmailField.value,
                Pass: signupPasswordField.value,
            }).then((data) => {
                console.log(data) 
                if (data) {
                    window.location.href="/index.html"
                    //    window.location="/feed.html"

                }
            });
        });
    }



})();







