const spicedPG = require("spiced-pg");

const db = spicedPG(
    process.env.DATABASE_URL ||
        "postgres:friederikegunther:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = function (first, last, email, hash_password) {
    return db.query(
        `INSERT INTO users (first, last, email, password_hash)
                        VALUES ($1, $2, $3, $4) RETURNING id, first, last, email;`,
        [first, last, email, hash_password]
    );
};
module.exports.findAllUser = (q) => {
    return db.query(
        `
        SELECT id, first, last, email, profile_picture_url, bio FROM users WHERE first ILIKE $1 OR last ILIKE $1 LIMIT 10;
        `,
        [q + "%"]
    );
};

module.exports.findUser = (id) => {
    return db.query(
        `
        SELECT id, first, last, email, password_hash FROM users WHERE id=$1;
        `,
        [id]
    );
};

module.exports.getUserById = (id) => {
    return db.query(
        `
        SELECT id, first, last, email, password_hash, bio, profile_picture_url FROM users WHERE id=$1;
        `,
        [id]
    );
};

module.exports.setNewPassword = (email, tempPassword) => {
    return db.query(
        `UPDATE users
    SET password_hash = $2 WHERE email = $1;`[(email, tempPassword)]
    );
};

module.exports.updateUserPhoto = (id, url) => {
    return db.query(
        "UPDATE users SET profile_picture_url = $2 WHERE id = $1 RETURNING *;",
        [id, url]
    );
};
module.exports.setBio = (id, bio) => {
    return db.query(
        `
        UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio;
        `,
        [id, bio]
    );
};

module.exports.setResetCode = (email, resetCode) => {
    return db.query(
        `
        INSERT INTO reset_codes (email, code)
        VALUES ($1, $2)
        `,
        [email, resetCode]
    );
};

module.exports.getResetCode = (email) => {
    return db.query(
        `SELECT * FROM reset_codes WHERE email =$1 ORDER BY created_at DESC LIMIT 1`,
        [email]
    );
};
module.exports.deletePassword = (email) =>
    db.query(`DELETE FROM reset_codes WHERE email = $1`, [email]);

module.exports.setNewPassword = (email, newPassword) => {
    return db.query(
        `
        UPDATE users
        SET password_hash = $2 WHERE email = $1
        `,
        [email, newPassword]
    );
};

module.exports.sendFriendRequest = (senderUserId, recieverUserId) => {
    return db.query(
        `
        INSERT INTO friends (sender_id, receiver_id, friendstatus) VALUES ($1, $2, false)
        `,
        [senderUserId, recieverUserId]
    );
};

module.exports.deleteFriendRequest = (senderUserId, recieverUserId) => {
    return db.query(
        `
        DELETE FROM friends
        WHERE (receiver_id = $2 AND sender_id = $1) OR (receiver_id = $1 AND sender_id = $2);
        `,
        [senderUserId, recieverUserId]
    );
};

module.exports.acceptFriendRequest = (senderUserId, recieverUserId) => {
    return db.query(
        `
        UPDATE friends SET friendstatus=true
        WHERE receiver_id = $2 AND sender_id = $1;
        `,
        [senderUserId, recieverUserId]
    );
};
module.exports.checkFriendStatus = (senderUserId, recieverUserId) => {
    return db.query(
        `
        SELECT * FROM friends 
        WHERE (receiver_id = $2 AND sender_id = $1) OR (receiver_id = $1 AND sender_id = $2);
        `,
        [senderUserId, recieverUserId]
    );
};
module.exports.getFriends = (id) => {
    return db.query(
        `
        
       	SELECT users.id, sender_id, receiver_id, friendstatus, users.first, users.last, users.profile_picture_url FROM friends
		JOIN users
        ON (sender_id = $1 AND receiver_id = users.id AND friendstatus = TRUE)
        OR (receiver_id = $1 AND sender_id = users.id AND friendstatus = TRUE)
        OR (receiver_id = $1 AND sender_id =users.id AND friendstatus = FALSE)
        `,
        [id]
    );
};

module.exports.addMessage = (sender, receiver, msg) =>
    db.query(
        `INSERT INTO messages(sender, receiver, msg) VALUES($1, $2, $3) RETURNING *;`,
        [sender, receiver, msg]
    );
