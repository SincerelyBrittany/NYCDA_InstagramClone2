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
		console.log(url)
		console.log(data)

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
	const loginPasswordField = document.querySelector('.js-password-input-login')
    const loginEmailField = document.querySelector('.js-email-input-login')

            if (!loginPasswordField.value || !loginEmailField.value) {
                alert('need name and password and email');
                return;
            }
            console.log(loginEmailField, loginPasswordField)

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
                // if (data) {
                //     window.location.href="/index.html"
                //     //    window.location="/feed.html"

                // }
            });
        });
    }
	
	
	//Add Feed
	
GET('/instagram')
  .then((v) => {
    const data = JSON.parse(JSON.parse(v));

    const postContainer = document.querySelector('');

    data.forEach((post) => {
      const div = document.createElement('div');
      div.classList.add('','','');
      div.innerHTML = `
                  <div class="">
                      <ul class="e">
                          <li>${post.username}</li>
                          <li class="" >1 week</li>
                      </ul>
                  </div>
                  <div class="">
                      <img src="${post.photolink}" class="">
                  </div>
			
                  <div class="">
                      <blockquote>
                        <p>${post.caption}</p>
                      </blockquote>
                  </div>
                  <div class="panel-footer">
                      <ul class="list-inline clearfix">
                          <li class=""><a href=""><span class=""></span> Like</a><span>10</span></li>
                          <li class=""><span class="">10</span><a class="" href=""><span class=""></span></a></li>
                      </ul>
                  </div> <!--panel footer-->
                  `
      postContainer.appendChild(div);
      })
  })




})();







