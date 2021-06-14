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

router.post("/login.json", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.json({
            error: "Something went wrong with your email or password",
        });
    } else {
        database
            .findUser(email)
            .then((result) => {
                if (!result.rows.length) {
                    response.json({
                        error: "Something went wrong with your email or password",
                    });
                    return;
                }

                bcrypt
                    .compare(password, result.rows[0].password_hash)
                    .then((valid) => {
                        if (valid) {
                            const { id, first, last, email } = result.rows[0];
                            request.session.user = {
                                id,
                                first,
                                last,
                                email,
                            };
                            response.json({ success: true });
                        } else {
                            response.json({
                                error: "please check if email and password are correct",
                            });
                        }
                    });
            })
            .catch((error) => {
                console.log(error);
                response.redirect("/login");
            });
    }
});
module.exports = router;
