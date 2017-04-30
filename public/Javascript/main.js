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

    window.GET = GET;

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

    if (document.querySelector('.index_page') !== null) {
        loginPage();
    }
    if (document.querySelector('.signup_page') !== null) {
        signupPage();
    }
    if (document.querySelector('.feed_page') !== null) {
        feedPage();
    }
    if (document.querySelector('.profile_page') !== null) {
        profilePage();

    }
    //LOGIN POST
    function loginPage() {
        const form = document.querySelector('.form');


        if (form !== null) {
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
                        console.log('>>>>>', data)
                        if (data.success) {
                            window.location.href = "./feed.html"
                                //    window.location="/feed.html"

                        }
                    });
            });
        }
    }

    function signupPage() {

        const signupButton = document.querySelector('.js-button-signup');

        if (signupButton !== null) {
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
                        window.location.href = "/index.html"
                            //    window.location="/feed.html"

                    }
                });
            });
        }
    }

    function feedPage() {

        function profilePictures() {

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

            // Get a reference to the storage service, which is used to create references in your storage bucket
            const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

            uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
                console.log(files)
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
                    // these are the files ^
                });
            }); // upload files

        }

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




        const validate = () => {
            throw new Error('This is a required arg');
        }; // validate

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
        const config = {
            apiKey: "AIzaSyANkdf3KcNrJ2EDGqCLn1te46zsk4cn04g",
            authDomain: "nycda-instagram-clone.firebaseapp.com",
            databaseURL: "https://nycda-instagram-clone.firebaseio.com",
            projectId: "nycda-instagram-clone",
            storageBucket: "nycda-instagram-clone.appspot.com",
            messagingSenderId: "956508152154"
        };
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




    //Add Feed

    function feedPage() {

        GET('/api/instagram')
            .then((data) => {
                // const data = JSON.parse(JSON.parse(v));
                console.log('made it here', data);
                const postContainer = document.querySelector('.js-card');

                data.forEach((post) => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                  <div class="content">
                            <div class="right floated meta js-time-posted">14h</div>
                            <!-- This is where the time is for when a post was posted -->
                            <img class="ui avatar image js-user-avatar" src="https://www.themarysue.com/wp-content/uploads/2015/12/avatar.jpeg" alt="Smiley face">
                            <!-- This is the users personal avatar photo -->
                            <span class="js-username">${post.username}</span>
                            <!-- This is where the username should be -->
                            <div class="js-uploaded-instagram-photo">
                                <img class="uploadedphoto" src="${post.photolink}" alt="Smiley face" height="280" width="250">
                                <div>
                                    <span class="js-username">Username Here</span>
                                    <!-- This is where the username should be -->
                                    <div class="js-photo-description"> ${post.caption}</div>
                                    <!-- THis is where the photo description should be -->
                                </div>
                            </div>
                            <div class="content">
                                <span class="right floated">
                                  <button class= "js-button-likes"> <i class="heart outline like icon"></i>17 likes</button>
                                  <!-- This is where the button likes are -->
                                </span>
                                <i class="comment icon"></i> 3 comments
                            </div>
                            <div class="extra content">
                                <div class="ui large transparent left icon input">
                                    <i class="heart outline icon"></i>
                                    <input type="text" placeholder="Add Comment...">
                                </div>
                            </div>
                        </div>
                  `
                    postContainer.appendChild(div);
                })
            })
    }


})();
