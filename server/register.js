const router = require("express").Router();
const bcrypt = require("./bcrypt.js");
const database = require("./db.js");

router.post("/register", (request, response) => {
    const { first, last, email, password } = request.body;
    if (!first || !last || !email || !password) {
        response.json({
            error: "Please fill out all the input fields to register!",
            first,
            last,
            success: false,
        });
    } else {
        bcrypt.genHash(password).then((hashedPassword) => {
            database
                .addUser(first, last, email, hashedPassword)
                .then((result) => {
                    request.session.user = result.rows[0];
                    response.json({ success: true });
                })
                .catch((error) => {
                    console.log(error);
                    response.json({
                        error: "Please fill out all the input fields to register!",
                        first,
                        last,
                        success: false,
                    });
                });
        });
    }
});

//login
module.exports = router;
