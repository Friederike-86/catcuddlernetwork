const express = require("express");
const app = express();
const addUser = require("./server")
const bcrypt = require ("./bcrypt.js")

app.post("/register", (request, response) => {
    const { first, last, email, password } = request.body;
    if (!first || !last || !email || !password) {
        response.render("register", {
            error: "Please fill out all the input fields to register!",
            first,
            last,
        });
    } else {
        bcrypt.genHash(password).then((hashedPassword) => {
            addUser(first, last, email, hashedPassword)
                .then((result) => {
                    request.session.user = result.rows[0];
                    response.redirect(302, "/profile");
                })
                .catch((error) => {
                    console.log(error);
                    response.render("register", {
                        error: "Something went wrong with your email or password",
                        first,
                        last,
                    });
                });
        });
    }
});