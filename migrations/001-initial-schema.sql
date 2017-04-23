-- UP

CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    profile_photo TEXT,
    password TEXT
);
CREATE TABLE Posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER NOT NULL,
	photolink TEXT NOT NULL,
	caption CHAR(150),
	date_time DATETIME 

);
CREATE table Following (
    user_id INTEGER,
    following_id INTEGER
);

INSERT into Users (username, email, profile_photo, password) VALUES ('Lisa', 'lisa@gmail.com','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSa1yF6jynSk8FUlAeIEGM4hDeAFiPLgUWpx3X0hwCszcRLXnFW','1234');
INSERT into Users (username, email, profile_photo, password) VALUES ('Martin', 'martin@gmail.com','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSa1yF6jynSk8FUlAeIEGM4hDeAFiPLgUWpx3X0hwCszcRLXnFW','2234');
INSERT into Users (username, email, profile_photo, password) VALUES ('Brittany', 'brittany@gmail.com','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSa1yF6jynSk8FUlAeIEGM4hDeAFiPLgUWpx3X0hwCszcRLXnFW','3234');
INSERT into Users (username, email, profile_photo, password) VALUES ('Taq', 'taq@gmail.com','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSa1yF6jynSk8FUlAeIEGM4hDeAFiPLgUWpx3X0hwCszcRLXnFW','4234');


INSERT into  Following (user_id, following_id) VALUES (1,2);
INSERT into  Following (user_id, following_id) VALUES (2,3);
INSERT into  Following (user_id, following_id) VALUES (3,4);
INSERT into  Following (user_id, following_id) VALUES (4,1);


INSERT into Posts (user_id, photolink, caption) VALUES (1, 'https://images.pexels.com/photos/28773/pexels-photo-28773.jpg?h=350&auto=compress&cs=tinysrgb', 'first photo');
INSERT into Posts (user_id, photolink, caption) VALUES (2, 'https://images.pexels.com/photos/29986/pexels-photo-29986.jpg?h=350&auto=compress&cs=tinysrgb', 'second photo');
INSERT into Posts (user_id, photolink, caption) VALUES (3, 'https://images.pexels.com/photos/132419/pexels-photo-132419.jpeg?h=350&auto=compress&cs=tinysrgb', 'third photo');
INSERT into Posts (user_id, photolink, caption) VALUES (4, 'https://images.pexels.com/photos/94876/pexels-photo-94876.jpeg?h=350&auto=compress&cs=tinysrgb', 'fourth photo');







-- DOWN

DROP TABLE users;
DROP TABLE posts;
DROP TABLE following;