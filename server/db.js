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