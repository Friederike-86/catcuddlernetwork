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
        SELECT id, first, last, email, password_hash FROM users WHERE email=$1;
        `,
        [email]
    );
};
module.exports.getUserById = (id) => {
    return db.query(
        `
        SELECT id, first, last, email, password_hash FROM users WHERE id=$1;
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
