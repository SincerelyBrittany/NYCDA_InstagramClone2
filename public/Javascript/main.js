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

	function DELETE(url, data) {
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
    const loginEmail = document.querySelector(‘.js-email-input-login’)
    const loginPassword = document.querySelector(‘.js-password-input-login’)
    const loginButton = document.querySelector(‘.js-login-button’)
    // const submitLogin = document.querySelector(‘.js-login-button’)

    //Sign-Up
    const signupEmail = document.querySelector(‘.js-email-input-signup’)
    const signupPassword = document.querySelector(‘.js-password-input-signup’)
    const signupButton = document.querySelector(‘.js-button-signup’)
    // const submitSignup = document.querySelector(‘.js-login-button’)

   //LOGIN POST
    submitLogin.addEventListener(‘click’, () => {
      POST(‘/api/work’,{
        header: header.value,
        imageUrl: workurl.value
      })
    })

   //Sign-Up POST
    submitSignup.addEventListener(‘click’, () => {
      POST(‘/api/commissioned’,{
        folder: selector.value,
        imageUrl: commissionedUrl.value
      })
    })
  };


	})();





