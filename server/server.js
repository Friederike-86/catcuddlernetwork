const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const secrets = require("../secrets.json");

app.use(compression());

app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 30,
    })
);

app.use(express.json());

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", (req, res) => {
    // TODO: read userId from session (req.session.userId)
    // (you need to setup session middleware first)
    res.json({
        // userId: 3,
        userId: undefined,
        // userId: req.session.userId
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3000, function () {
    console.log("I'm listening.");
});
