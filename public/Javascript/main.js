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
const form = document.querySelector('.form');


    if(form !== null) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
    const loginPasswordField = document.querySelector('.js-password-input-login')
    const loginEmailField = document.querySelector('.js-email-input-login')

            if (!loginPasswordField.value || !loginEmailField.value) {
                alert('need name and password and email');
                return;
            }
            console.log(loginEmailField, loginPasswordField)


            console.log("About to login in")
            const username = loginEmailField.value;
            const password = loginPasswordField.value

            POST('/api/login', {
                // loginUsernameField,
                username,
                password,
            })
            .then((data) => {
                console.log('>>>>>',data) 
                if (data.success) {
                    window.location.href="./feed.html"
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

                if (data.success) {
                    window.location.href="/index.html"
                    //    window.location="/feed.html"

                }
            });
        });
    }

 
 function profilePictures (){

        const validate = () => {
            throw new Error('This is a required arg');
        }; // validate

        const photo = document.querySelector('.js-photo');
        const photoSelect = document.querySelector('.js-photoSelect');


        const uploadFiles = (
            fileSelectSel = validate(),
            fileElemSel = validate(),
            onFileChanged = validate()
        ) => {
            // select anchor tag and file input
            const fileSelect = document.querySelector(fileSelectSel);
            const fileElem = document.querySelector(fileElemSel);

            if (fileSelect === null || fileElem === null) {
                throw new Error('Required DOM elements not found by querySelector');
            }


            // click handler for fileElem
            fileSelect.addEventListener('click', (e) => {
                e.preventDefault();
                fileElem && fileElem.click();
            });

            // change handler for fileSelect
            fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
        } // uploadFiles


        // Initialize Firebase
         // Initialize Firebase
            var config = {
            apiKey: "AIzaSyANkdf3KcNrJ2EDGqCLn1te46zsk4cn04g",
            authDomain: "nycda-instagram-clone.firebaseapp.com",
            databaseURL: "https://nycda-instagram-clone.firebaseio.com",
             projectId: "nycda-instagram-clone",
             storageBucket: "nycda-instagram-clone.appspot.com",
         messagingSenderId: "956508152154"
            };
        firebase.initializeApp(config);
        // Name of file storage ref "folder"
        const FILE_STORAGE_REF = 'images';

        // initialize firebase
        firebase.initializeApp(config);
        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

        uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
            if (!storageRef) {
                throw new Error('Storage Ref not set!');
            }
            const fileUploads = Array.from(files).map((currFile) => {
                // we store the name of the file as a storage ref
                const fileRef = storageRef.child(currFile.name);
                // we return a promise where we first "put" or upload the file
                // and then once the upload is complete, we return promise with
                // download URL string of the file we uploaded
                return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
            });

            Promise.all(fileUploads).then((items) => {
                console.log(items);
            });
        }); // upload files

    }

<<<<<<< HEAD
    const createPost = () => {

    	const postSummary = document.querySelector('.js-summary');
    	console.log(typeof postSummary);
		postSummary.setAttribute('disabled', 'disabled');
		console.log('made it past setAttribute');
            // POST('/api/' + userId + '/post', {
            //     descr: postSummary.value,
            //     image_url: imageURL
            // }).then((data) => {
            //     // console.log(data)
            //     postSummary.removeAttribute('disabled');
            //     postSummary.value = '';
            // });


    }
		document.querySelector('.js-createPost').addEventListener('click', (e) => {
            e.preventDefault();
            createPost();
        });



	
	
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
=======
    // const createPost = () => {

    //     const postSummary = document.querySelector('.js-summary');
    //     console.log(typeof postSummary);
    //     postSummary.setAttribute('disabled', 'disabled');
    //     console.log('made it past setAttribute');
    //         // POST('/api/' + userId + '/post', {
    //         //     descr: postSummary.value,
    //         //     image_url: imageURL
    //         // }).then((data) => {
    //         //     // console.log(data)
    //         //     postSummary.removeAttribute('disabled');
    //         //     postSummary.value = '';
    //         // });


    // }
    //     document.querySelector('.js-createPost').addEventListener('click', (e) => {
    //         e.preventDefault();
    //         createPost();
    //     });

    
    
    //Add Feed
    
// GET('/instagram')
//   .then((v) => {
//     const data = JSON.parse(JSON.parse(v));

//     const postContainer = document.querySelector('');

//     data.forEach((post) => {
//       const div = document.createElement('div');
//       div.classList.add('','','');
//       div.innerHTML = `
//                   <div class="">
//                       <ul class="e">
//                           <li>${post.username}</li>
//                           <li class="" >1 week</li>
//                       </ul>
//                   </div>
//                   <div class="">
//                       <img src="${post.photolink}" class="">
//                   </div>
            
//                   <div class="">
//                       <blockquote>
//                         <p>${post.caption}</p>
//                       </blockquote>
//                   </div>
//                   <div class="panel-footer">
//                       <ul class="list-inline clearfix">
//                           <li class=""><a href=""><span class=""></span> Like</a><span>10</span></li>
//                           <li class=""><span class="">10</span><a class="" href=""><span class=""></span></a></li>
//                       </ul>
//                   </div> <!--panel footer-->
//                   `
//       postContainer.appendChild(div);
//       })
//   })
>>>>>>> 3bdb8dc8d6ab76b263a19c44b9c9c5b207e8f277




})();
