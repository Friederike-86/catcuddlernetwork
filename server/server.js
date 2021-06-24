const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const secrets = require("./secrets.json");
const db = require("./db.js");
const uploader = require("./multer");
const s3 = require("./s3.js");
const friends = require("./friends");

const register = require("./register");
//const login = require("./login");
const reset = require("./resetpassword");

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(compression());
app.use(
    cookieSession({
        secret: secrets.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 30,
    })
);

app.use(csurf());

app.use(function (request, response, next) {
    response.cookie("mytoken", request.csrfToken());
    next();
});
app.post("/user/bio.json", async (request, response) => {
    try {
        const result = await db.setBio(
            request.session.user.id,
            request.body.bio
        );
        console.log(result);
        response.json({
            success: true,
            bio: result.rows[0].bio,
        });
    } catch (error) {
        response.json({
            success: false,
            error,
        });
    }
});
app.use(register);
//app.use(login);
app.use(reset);
app.use(friends);

app.get("/user/id.json", (request, response) => {
    response.json({ id: request.session.user });
});

app.get("/user/data.json", (request, response) => {
    db.getUserById(request.session.user.id)
        .then((result) => {
            //console.log(result);
            if (!result.rows.length) {
                return response.json({
                    success: false,
                    error: "Whoops, something went wrong",
                });
            }
            delete result.rows[0].password;
            response.json({
                success: true,
                user: result.rows[0],
            });
        })
        .catch((error) => console.log(error));
});

app.post(
    "/user/upload-picture.json",
    uploader.single("file"),
    (request, response) => {
        //console.log(request.file);
        if (!request.file) {
            return response.json({
                success: false,
                error: "Please, upload a nice Picture",
            });
        }
        s3.uploadFile(request.file)
            .then(() => {
                const url = s3.getS3URL(request.file.filename);
                console.log(request.session.user, url);
                db.updateUserPhoto(request.session.user.id, url)
                    .then((result) => {
                        console.log(result);
                        delete result.rows[0].password;
                        response.json({
                            success: true,
                            user: result.rows[0],
                        });
                    })
                    .catch((error) => {
                        response.json({
                            success: false,
                            error: "Whoops, there is a Server-ERROR",
                        });
                    });
            })
            .catch((error) => console.log(error));
    }
);

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
