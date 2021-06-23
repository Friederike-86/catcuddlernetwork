const db = require("./db.js");
const { sendEmail } = require("./ses.js");
const { genHash } = require("./bcrypt.js");

const cryptoRandomString = require("crypto-random-string");
const express = require("express");

app.post("/password/reset/reset.json", (request, response) => {
    const { email } = request.body;
    db.getUser(email)
        .then((result) => {
            if (result.rows[0]) {
                request.session.email = email;
                const resetCode = cryptoRandomString({ length: 10 });
                db.setResetPassword(email, resetPassword)
                    .then(() => {
                        sendEmail(
                            email,
                            "You can reset your password",
                            resetCode
                        );
                        response.status(200).json({});
                    })
                    .catch((error) => {
                        console.log(error);
                        response.status(400).json({ error: true });
                    });
            } else throw new Error("User Not Found");
        })
        .catch((error) => {
            console.log(error);
            response.status(400).json({ error: true });
        });
});

app.post("/password/reset/verify.json", (request, response) => {
    const { resetPassword, newPassword } = request.body;
    const { email } = req.session;
    db.setResetPassword(email, resetPassword)
        .then((result) => {
            const { code } = result.rows[0];
            if (code === resetPassword) {
                genHash(newPassword)
                    .then((hashedPassword) => {
                        db.setNewPassword(email, hashedPassword)
                            .then(() => {
                                response.status(200).json({});
                            })
                            .catch((error) => {
                                console.log(error);
                                response.status(400).json({ error: true });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        response.status(400).json({ error: true });
                    });
            } else throw new Error("Wrong Email or Passoword");
        })
        .catch((error) => {
            console.log(error);
            response.status(400).json({ error: true });
        });
});
