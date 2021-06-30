const db = require("./db.js");
const { sendEmail } = require("./ses.js");
const { genHash } = require("./bcrypt.js");

const cryptoRandomString = require("crypto-random-string");

const router = require("express").Router();

router.post("/password/reset/start.json", (request, response) => {
    const { email } = request.body;
    console.log("email", email);
    db.findUser(email)
        .then((result) => {
            console.log(result);
            if (result.rows.length) {
                request.session.email = email;
                const resetCode = cryptoRandomString({ length: 10 });
                db.setResetCode(email, resetCode)
                    .then(() => {
                        sendEmail(
                            email,
                            "You can reset your password " + resetCode,
                            "Password Reset"
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

router.post("/password/reset/verify.json", (request, response) => {
    const { code, password } = request.body;
    const { email } = request.session;
    db.getResetCode(email)
        .then((result) => {
            const savedCode = result.rows[0].code;
            if (savedCode === code) {
                genHash(password)
                    .then((hashedPassword) => {
                        db.setNewPassword(email, hashedPassword)
                            .then(() => {
                                response.status(200).json({ success: true });
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

module.exports = router;
