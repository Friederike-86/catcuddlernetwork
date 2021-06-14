const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const secrets = require("../secrets.json");
const { response } = require("express");


const register = require ("./register");
const login = require ("./login");

app.use(compression());

app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 30,
    })
);

app.use(express.json());

app.use(csurf());

app.use(function (request, response, next) {
    response.cookie("mytoken", request.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(register);
app.use(login);

app.get("/user/id.json", (request, response) => {
    response.json({ id: request.session.user })
    };


app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3000, function () {
    console.log("I'm listening.");
});
