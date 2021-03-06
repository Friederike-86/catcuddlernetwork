const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const sessionSecret =
    process.env.SESSION_SECRET || require("./secrets").SESSION_SECRET;
const db = require("./db.js");
const uploader = require("./multer");
const s3 = require("./s3.js");
const friends = require("./friends");

const register = require("./register");
//const login = require("./login");
const reset = require("./resetpassword");

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.json());

app.use(compression());
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 30,
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
app.get("/users/:id.json", async (request, response) => {
    const { id } = request.params;
    try {
        if (id == request.session.user.id) {
            throw new Error("Whoops, that is u");
        } else {
            const userDetails = await db.getUserById(id);
            if (!userDetails.rows.length) response.json({ error: true });
            else {
                delete userDetails.rows[0].password_hash;
                response.json({ user: userDetails.rows[0] });
            }
        }
    } catch (error) {
        response.status(400).json({ error: true });
    }
});
app.get("/findusers/users.json", async (request, response) => {
    try {
        const findUser = await db.findAllUser(request.query.q);
        console.log(findUser);
        response.json({ success: true, users: findUser.rows });
    } catch (error) {
        console.log(error);
        response.status(400).json({ error: true });
    }
});
app.get("/rating.json", async (request, response) => {
    try {
        const otherUserId = request.query.q;
        console.log(otherUserId);
        const result = await db.averageRating(otherUserId);
        const check = await db.checkRating(
            request.session.user.id,
            otherUserId
        );
        response.json({
            success: true,
            rating: result.rows[0],
            check: check.rows.length ? true : false,
        });
    } catch (error) {
        console.log(error);
        response.status(400).json({ error: true });
    }
});

app.post("/rating.json", async (request, response) => {
    try {
        const { otherUserId, ratingValue } = request.body;
        const id = request.session.user.id;
        await db.setRating(id, otherUserId, ratingValue);
        response.json({ success: true });
    } catch (error) {
        console.log(error);
        response.status(400).json({ error: true });
    }
});

app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", async function (socket) {
    console.log("new socket client just connected", socket.id);

    console.log(socket.request.session);

    // if an unauthenticated user tries to connect to our WS,
    // we directly close the connection.
    if (!socket.request.session.user) {
        return socket.disconnect(true);
    }

    // if a user makes it here, they are logged in
    const userId = socket.request.session.user.id;
    await db.saveUser(userId, socket.id);

    socket.on("chatMessage", async ({ message, receiver, name }) => {
        console.log(message, receiver);
        const response = await db.addChatMessages(userId, receiver, message);
        const result = await db.getSocket(receiver);
        if (result.rows.length) {
            socket.emit("newChatMessage", {
                message,
                sender: receiver,
                name,
            });
            const socketId = result.rows[0].socket;
            io.to(socketId).emit("newChatMessage", {
                message,
                sender: userId,
                name,
            });
        }
    });
    socket.on("newChatMessage", (message) => {
        socket.emit("sendChatMessage", message);
    });
    socket.on("disconnect", async () => {
        await db.deleteSocket(userId);
    });
});
server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
