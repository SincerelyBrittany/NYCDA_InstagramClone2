
const DB = {};

DB.init = function (db){
    DB.db = db;
}

 



DB.getUsers = () => {
    return db.all(`SELECT 
                    Users.id AS id,
                    Users.username AS username
                FROM Users 
                    ORDER BY id ASC`)
};

// Get a specified user via user.id + their activity
DB.getUser = (user_id) => {
    return db.all(`SELECT 
                    Users.username AS username,
                    Users.profile_photo AS profile_photo,
                    Posts.photolink AS photolink,
                    Posts.caption AS caption,
                    Posts.date_time
                FROM Users 
                    INNER JOIN Posts ON Posts.user_id = Users.id
                WHERE users.id = ${user_id}`)
};

// Get a specified post via post.post_id
DB.getPost = (post_id) => {
    return db.all(`SELECT
                    Users.username AS username,
                    Users.profile_photo AS profile_photo,
                    Posts.image_url AS image,
                    Posts.descr AS description,
                    Posts.date_time
                FROM Posts
                    INNER JOIN users ON Posts.user_id = Users.id
                WHERE Posts.post_id = ${post_id}`)
};

// Get users that $user_id follows ## this is for the feed
DB.getFollowed = (user_id) => {
    return db.all(`SELECT 
                    Users.username AS username,
                    Users.profile_photo AS profile_photo,
                    Posts.photolink AS photolink,
                    Posts.caption AS caption,
                    Posts.date_time
                FROM users
                    INNER JOIN Following ON Following.following_id = Users.id 
                    INNER JOIN Posts ON Posts.user_id = Users.id
                WHERE Following.user_id = ${user_id}`)
};



// Create a post
DB.createPost = (user_id, req) => {
    return DB.db.run(`INSERT INTO posts (user_id, photolink, caption) values (${user_id}, ${photolink}, ${caption})`, req)
};

// Follow a user
DB.followUser = (user_id, following_id) => {
    return DB.db.run(`INSERT INTO following (user_id, following_id) VALUES (${user_id}, ${following_id})`)
};

// Edit a post
DB.updatePost = (user_id, post_id, updatedText) => {
    return DB.db.run(`UPDATE Posts SET descr = "${updatedText}" WHERE post_id = ${post_id} and user_id = ${user_id}`)
};

// Delete a post
DB.deletePost = (user_id, post_id) => {
    return DB.db.run(`DELETE FROM Posts WHERE post_id = ${post_id} and user_id = ${user_id}`)
};

// Unfollow a user
DB.unfollow = (user_id, following_id) => {
    return DB.db.run(`DELETE FROM Following WHERE user_id = ${user_id} AND following_id = ${following_id}`)
};

module.exports = DB




