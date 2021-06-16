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
module.exports.findUser = (email) => {
    return db.query(
        `
        SELECT users.id, first, last, email, password_hash FROM users WHERE email=$1;
        `,
        [email]
    );
};

module.exports.setNewPassword = (email, tempPassword) => {
    return db.query(
        `UPDATE user
    SET password_hash = $2 WHERE email = $1;`[(email, tempPassword)]
    );
};

module.exports.updateUserPhoto = (id, url) => {
    return db.query(
        "UPDATE user SET profile_picture_url = $2 WEHRE id = $1 RETURNING *;",
        [id, url]
    );
};
